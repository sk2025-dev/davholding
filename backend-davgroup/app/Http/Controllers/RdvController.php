<?php

namespace App\Http\Controllers;

use App\Mail\RdvConfirmationMail;
use App\Models\Rdv;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;


class RdvController extends Controller
{
    private string $baseUrl;
    private array  $headers;

    public function __construct()
    {
        $mode          = config('services.paydunya.mode', 'test');
        $this->baseUrl = $mode === 'live'
            ? 'https://app.paydunya.com/api/v1'
            : 'https://app.paydunya.com/sandbox-api/v1';

        $this->headers = [
            'PAYDUNYA-MASTER-KEY'  => config('services.paydunya.master_key'),
            'PAYDUNYA-PRIVATE-KEY' => config('services.paydunya.private_key'),
            'PAYDUNYA-TOKEN'       => config('services.paydunya.token'),
            'Content-Type'         => 'application/json',
        ];
    }

    // ── Liste (admin) ────────────────────────────────────────────
    public function index()
    {
        $rdvs = Rdv::orderBy('appointment_date', 'desc')->get();

        return response()->json([
            'data'    => $rdvs,
            'message' => 'Liste des rendez-vous',
        ]);
    }

    // ── Créer RDV + initier paiement PayDunya ───────────────────
    public function store(Request $request)
    {
        $request->validate([
            'service'        => 'required|string|max:255',
            'category'       => 'nullable|string|in:coiffure,ongerie,spa,conseil',
            'date'           => 'required|date',
            'time'           => 'required|string',
            'first_name'     => 'required|string|max:100',
            'last_name'      => 'required|string|max:100',
            'phone'          => 'required|string|max:30',
            'email'          => 'required|email|max:255',
            'notes'          => 'nullable|string|max:1000',
            'payment_method'  => 'nullable|string|in:mobile,card,cash',
            'advance_channel' => 'nullable|string|in:mobile,card',
            'network'         => 'nullable|string|in:wave-ci,orange-money-ci,mtn-ci,moov-ci',
        ]);

        $user           = $request->user();
        $frontendUrl    = env('FRONTEND_URL', 'http://localhost:5173');
        $appointmentDt  = Carbon::parse("{$request->date} {$request->time}");
        $clientName     = trim("{$request->first_name} {$request->last_name}");
        $advanceChannel = $request->input('advance_channel', 'card');
        $network        = $request->input('network');

        $rdv = Rdv::create([
            'user_id'          => $user->id,
            'client_name'      => $clientName,
            'client_email'     => $request->email,
            'client_phone'     => $request->phone,
            'appointment_date' => $appointmentDt,
            'service'          => $request->service,
            'category'         => $request->category,
            'notes'            => $request->notes,
            'status'           => 'pending',
            'payment_status'   => 'pending',
            'deposit_amount'   => 5000,
            'payment_method'   => $request->payment_method ?? 'mobile',
            'duration'         => '60',
        ]);

        // ── Canaux PayDunya selon le moyen de paiement de l'avance ──
        $channels = match($advanceChannel) {
            'mobile' => ['ORANGE_MONEY_CI', 'MTN_MOMO_CI', 'WAVE_CI', 'MOOV_MONEY_CI'],
            'card'   => ['VISA_QOSIC', 'MASTERCARD_QOSIC'],
            default  => null,
        };

        // ── Payload PayDunya ──────────────────────────────────
        $payload = [
            'invoice' => [
                'items' => [
                    'item_0' => [
                        'name'        => "Avance RDV — {$request->service}",
                        'quantity'    => 1,
                        'unit_price'  => '5000',
                        'total_price' => '5000',
                        'description' => "Avance pour rendez-vous du {$appointmentDt->isoFormat('D MMMM YYYY')} à {$request->time}",
                    ],
                ],
                'taxes'        => (object) [],
                'total_amount' => 5000,
                'description'  => "Avance RDV Dav'Beauté — {$clientName}",
            ],
            'store' => [
                'name'           => "Dav'Beauté",
                'tagline'        => "Beauté & Bien-être",
                'postal_address' => "Abidjan, Côte d'Ivoire",
                'phone_number'   => '0757249390',
                'logo_url'       => '',
                'website_url'    => $frontendUrl,
            ],
            'actions' => [
                'cancel_url'   => "{$frontendUrl}/beaute/rendezvous?rdv=annule",
                'return_url'   => "{$frontendUrl}/beaute/rendezvous?rdv=succes&id={$rdv->id}",
                'callback_url' => url('/api/rdv/ipn'),
            ],
            'custom_data' => [
                'rdv_id' => (string) $rdv->id,
            ],
            ...($channels ? ['payment_method' => ['allowed_channels' => $channels]] : []),
        ];

        Log::info('PayDunya RDV keys used', [
            'master' => substr(config('services.paydunya.master_key'), 0, 10) . '...',
            'private' => substr(config('services.paydunya.private_key'), 0, 15) . '...',
            'token' => substr(config('services.paydunya.token'), 0, 8) . '...',
            'url' => $this->baseUrl,
        ]);

        $response = Http::withHeaders($this->headers)
            ->post("{$this->baseUrl}/checkout-invoice/create", $payload);

        Log::info('PayDunya RDV response', ['status' => $response->status(), 'body' => $response->body()]);

        if (!$response->successful() || $response->json('response_code') !== '00') {
            Log::error('PayDunya RDV error', ['body' => $response->body()]);
            $rdv->forceDelete();
            return response()->json(['message' => 'Impossible de créer le paiement. Réessayez.'], 502);
        }

        $data = $response->json();

        // PayDunya retourne l'URL dans response_text
        $responseText = $data['response_text'] ?? '';
        $invoiceUrl = filter_var($responseText, FILTER_VALIDATE_URL)
            ? $responseText
            : ($data['invoice_url'] ?? $data['checkout_url'] ?? null);

        // Fallback : construire l'URL depuis le token
        if (!$invoiceUrl && isset($data['token'])) {
            $isSandbox  = str_contains($this->baseUrl, 'sandbox');
            $prefix     = $isSandbox ? 'sandbox-' : '';
            $invoiceUrl = "https://paydunya.com/{$prefix}checkout/invoice/{$data['token']}";
        }

        if (!$invoiceUrl) {
            $rdv->forceDelete();
            return response()->json(['message' => 'URL de paiement introuvable.'], 502);
        }

        $invoiceToken = $data['token'] ?? null;
        $rdv->update(['paydunya_token' => $invoiceToken]);

        /* ── SoftPay Mobile (si demandé) ── */
        if ($advanceChannel === 'mobile' && $network && $invoiceToken) {
            $softpayRes = Http::withHeaders($this->headers)
                ->post("{$this->baseUrl}/softpay/{$network}", [
                    'account_alias' => $request->phone,
                    'token'         => $invoiceToken,
                ]);

            Log::info('PayDunya RDV SoftPay', [
                'network' => $network,
                'status'  => $softpayRes->status(),
                'body'    => $softpayRes->body(),
            ]);

            $spData = $softpayRes->json() ?? [];
            if ($softpayRes->successful() && ($spData['response_code'] ?? '') === '00') {
                return response()->json([
                    'mode'   => 'softpay',
                    'rdv_id' => $rdv->id,
                ], 201);
            }
            /* Fallback : SoftPay indisponible → retourner l'invoice URL */
        }

        return response()->json([
            'invoice_url' => $invoiceUrl,
            'rdv_id'      => $rdv->id,
        ], 201);
    }

    // ── Créneaux disponibles pour une date ──────────────────────
    public function availableSlots(Request $request)
    {
        $request->validate(['date' => 'required|date_format:Y-m-d']);

        $date = Carbon::parse($request->date);

        // Dimanche fermé
        if ($date->isSunday()) {
            return response()->json(['data' => []]);
        }

        // Créneaux horaires alignés avec le frontend
        $allSlots = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00'];
        if ($date->isSaturday()) {
            $allSlots = ['09:00', '10:30', '12:00', '14:00'];
        }

        // Créneaux déjà pris (RDVs confirmés/en attente)
        $booked = Rdv::whereDate('appointment_date', $date->toDateString())
            ->whereNotIn('status', ['cancelled'])
            ->get()
            ->map(fn(Rdv $r) => Carbon::parse($r->appointment_date)->format('H:i'))
            ->toArray();

        $available = array_values(array_filter($allSlots, fn($s) => !in_array($s, $booked)));

        return response()->json(['data' => $available, 'booked' => $booked]);
    }

    // ── Notifications admin (RDVs non vus) ──────────────────────
    public function notifications()
    {
        $count = Rdv::where('is_notified', false)
            ->whereNotIn('status', ['cancelled'])
            ->count();

        return response()->json(['count' => $count]);
    }

    public function markNotified()
    {
        Rdv::where('is_notified', false)->update(['is_notified' => true]);
        return response()->json(['ok' => true]);
    }

    // ── Détail RDV + auto-confirmation après retour PayDunya ───
    public function show(int $id)
    {
        $rdv = Rdv::find($id);
        if (!$rdv) {
            return response()->json(['message' => 'RDV introuvable.'], 404);
        }

        /* Vérification PayDunya si le RDV n'est pas encore confirmé */
        if (in_array($rdv->status, ['pending', 'awaiting']) && $rdv->paydunya_token) {
            $confirmRes  = Http::withHeaders($this->headers)
                ->get("{$this->baseUrl}/checkout-invoice/confirm/{$rdv->paydunya_token}");
            $confirmData = $confirmRes->json() ?? [];

            if ($confirmRes->successful() && ($confirmData['response_code'] ?? '') === '00') {
                if ($rdv->payment_status !== 'paid') {
                    $rdv->update([
                        'status'         => 'confirmed',
                        'payment_status' => 'paid',
                    ]);
                    $rdv = $rdv->fresh();

                    try {
                        Mail::to($rdv->client_email)->send(new RdvConfirmationMail($rdv));
                    } catch (\Throwable $e) {
                        Log::error('RDV confirmation email failed', [
                            'rdv_id' => $rdv->id,
                            'error'  => $e->getMessage(),
                        ]);
                    }
                }
            }
        }

        return response()->json(['data' => $rdv->fresh()]);
    }

    // ── Mise à jour statut (admin) ──────────────────────────────
    public function updateStatus(Request $request, Rdv $rdv)
    {
        $request->validate([
            'status' => 'required|string|in:pending,confirmed,done,cancelled,awaiting',
        ]);

        $rdv->update(['status' => $request->status]);

        return response()->json([
            'data'    => $rdv->fresh(),
            'message' => 'Statut mis à jour.',
        ]);
    }

    // ── IPN PayDunya — confirmation + email ─────────────────────
    public function ipn(Request $request)
    {
        $hash         = $request->input('hash');
        $expectedHash = hash('sha512', config('services.paydunya.master_key'));

        if ($hash !== $expectedHash) {
            Log::warning('PayDunya RDV IPN: invalid hash');
            return response()->json(['error' => 'Invalid hash'], 403);
        }

        $data   = $request->input('data', []);
        $token  = data_get($data, 'invoice.token');
        $status = data_get($data, 'invoice.status');

        if ($token && $status === 'completed') {
            $rdv = Rdv::where('paydunya_token', $token)->first();
            if ($rdv && $rdv->payment_status !== 'paid') {
                $rdv->update([
                    'status'         => 'confirmed',
                    'payment_status' => 'paid',
                    'is_notified'    => true,
                ]);

                try {
                    Mail::to($rdv->client_email)->send(new RdvConfirmationMail($rdv));
                } catch (\Throwable $e) {
                    Log::error('RDV email failed', ['rdv_id' => $rdv->id, 'error' => $e->getMessage()]);
                }
            }
        }

        return response()->json(['ok' => true]);
    }
}
