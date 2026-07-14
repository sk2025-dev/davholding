<?php

namespace App\Http\Controllers;

use App\Models\DeliveryZone;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    private string $baseUrl;
    private array $headers;

    public function __construct()
    {
        $mode = config('services.paydunya.mode', 'test');
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

    public function initiate(Request $request)
    {
        $request->validate([
            'items'             => 'required|array|min:1',
            'items.*.title'     => 'required|string',
            'items.*.quantity'  => 'required|integer|min:1',
            'items.*.unitPrice' => 'required|numeric|min:0',
            'commune'           => 'nullable|string|max:100',
            'client_name'       => 'nullable|string|max:255',
            'client_phone'      => 'nullable|string|max:30',
            'shipping_address'  => 'nullable|string|max:500',
            'payment_channel'   => 'nullable|string|in:mobile,card',
        ]);

        $user        = $request->user();
        $items       = $request->input('items');
        $subtotal    = collect($items)->sum(fn($i) => $i['unitPrice'] * $i['quantity']);
        $commune        = $request->input('commune');
        $deliveryFee    = DeliveryZone::feeFor($commune);
        $total          = $subtotal + $deliveryFee;
        $paymentChannel = $request->input('payment_channel'); // 'mobile' | 'card' | null

        $order = Order::create([
            'user_id'          => $user->id,
            'order_number'     => Order::generateOrderNumber(),
            'client_name'      => $request->input('client_name') ?: $user->name,
            'client_email'     => $user->email,
            'client_phone'     => $request->input('client_phone'),
            'shipping_address' => $request->input('shipping_address') ?: $commune,
            'subtotal'         => $subtotal,
            'tax'              => 0,
            'shipping'         => $deliveryFee,
            'discount'         => 0,
            'total'            => $total,
            'status'           => 'pending',
            'payment_status'   => 'pending',
            'payment_method'   => 'paydunya',
            'notes'            => json_encode($items, JSON_UNESCAPED_UNICODE),
        ]);

        $pdItems = [];
        foreach ($items as $idx => $item) {
            $pdItems["item_{$idx}"] = [
                'name'        => $item['title'],
                'quantity'    => $item['quantity'],
                'unit_price'  => (string) $item['unitPrice'],
                'total_price' => (string) ($item['unitPrice'] * $item['quantity']),
                'description' => '',
            ];
        }
        // Ajouter la livraison comme ligne séparée
        if ($deliveryFee > 0) {
            $pdItems['item_livraison'] = [
                'name'        => $commune ? "Livraison — {$commune}" : 'Frais de livraison',
                'quantity'    => 1,
                'unit_price'  => (string) $deliveryFee,
                'total_price' => (string) $deliveryFee,
                'description' => '',
            ];
        }

        $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173');

        // Canaux PayDunya selon le choix du client
        $channels = match($paymentChannel) {
            'mobile' => ['ORANGE_MONEY_CI', 'MTN_MOMO_CI', 'WAVE_CI', 'MOOV_MONEY_CI'],
            'card'   => ['VISA_QOSIC', 'MASTERCARD_QOSIC'],
            default  => null,
        };

        $payload = [
            'invoice' => [
                'items'        => $pdItems,
                'taxes'        => (object) [],
                'total_amount' => (int) round($total),
                'description'  => "Commande {$order->order_number} - Dav'Beauté",
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
                'cancel_url'   => "{$frontendUrl}/paiement/annule",
                'return_url'   => "{$frontendUrl}/paiement/succes?order={$order->order_number}",
                'callback_url' => url('/api/payment/ipn'),
            ],
            ...($channels ? ['payment_method' => ['allowed_channels' => $channels]] : []),
            'custom_data' => [
                'order_id'     => (string) $order->id,
                'order_number' => $order->order_number,
            ],
        ];

        $response = Http::withHeaders($this->headers)
            ->post("{$this->baseUrl}/checkout-invoice/create", $payload);

        Log::info('PayDunya response', ['status' => $response->status(), 'body' => $response->body()]);

        if (!$response->successful() || $response->json('response_code') !== '00') {
            Log::error('PayDunya initiate error', ['body' => $response->body()]);
            $order->forceDelete();
            return response()->json(['message' => 'Impossible de créer la facture de paiement. Réessayez.'], 502);
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
            Log::error('PayDunya: URL introuvable', ['data' => $data]);
            $order->forceDelete();
            return response()->json(['message' => 'URL de paiement introuvable.'], 502);
        }

        $order->update(['paydunya_token' => $data['token'] ?? null]);

        return response()->json([
            'invoice_url'  => $invoiceUrl,
            'order_number' => $order->order_number,
        ]);
    }

    public function mobileInitiate(Request $request)
    {
        $request->validate([
            'items'             => 'required|array|min:1',
            'items.*.title'     => 'required|string',
            'items.*.quantity'  => 'required|integer|min:1',
            'items.*.unitPrice' => 'required|numeric|min:0',
            'commune'           => 'nullable|string|max:100',
            'client_name'       => 'required|string|max:255',
            'client_phone'      => 'required|string|max:30',
            'shipping_address'  => 'nullable|string|max:500',
            'network'           => 'required|string|in:wave-ci,orange-money-ci,mtn-ci,moov-ci',
        ]);

        $user        = $request->user();
        $items       = $request->input('items');
        $subtotal    = collect($items)->sum(fn($i) => $i['unitPrice'] * $i['quantity']);
        $commune     = $request->input('commune');
        $deliveryFee = DeliveryZone::feeFor($commune);
        $total       = $subtotal + $deliveryFee;
        $network     = $request->input('network');
        $phone       = $request->input('client_phone');

        $order = Order::create([
            'user_id'          => $user->id,
            'order_number'     => Order::generateOrderNumber(),
            'client_name'      => $request->input('client_name'),
            'client_email'     => $user->email,
            'client_phone'     => $phone,
            'shipping_address' => $request->input('shipping_address') ?: $commune,
            'subtotal'         => $subtotal,
            'tax'              => 0,
            'shipping'         => $deliveryFee,
            'discount'         => 0,
            'total'            => $total,
            'status'           => 'pending',
            'payment_status'   => 'pending',
            'payment_method'   => 'paydunya',
            'notes'            => json_encode($items, JSON_UNESCAPED_UNICODE),
        ]);

        /* ── Étape 1 : créer la facture PayDunya ── */
        $pdItems = [];
        foreach ($items as $idx => $item) {
            $pdItems["item_{$idx}"] = [
                'name'        => $item['title'],
                'quantity'    => $item['quantity'],
                'unit_price'  => (string) $item['unitPrice'],
                'total_price' => (string) ($item['unitPrice'] * $item['quantity']),
                'description' => '',
            ];
        }
        if ($deliveryFee > 0) {
            $pdItems['item_livraison'] = [
                'name'        => $commune ? "Livraison — {$commune}" : 'Frais de livraison',
                'quantity'    => 1,
                'unit_price'  => (string) $deliveryFee,
                'total_price' => (string) $deliveryFee,
                'description' => '',
            ];
        }

        $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173');
        $invoicePayload = [
            'invoice' => [
                'items'        => $pdItems,
                'taxes'        => (object) [],
                'total_amount' => (int) round($total),
                'description'  => "Commande {$order->order_number} - Dav'Beauté",
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
                'cancel_url'   => "{$frontendUrl}/paiement/annule",
                'return_url'   => "{$frontendUrl}/paiement/succes?order={$order->order_number}",
                'callback_url' => url('/api/payment/ipn'),
            ],
            'custom_data' => [
                'order_id'     => (string) $order->id,
                'order_number' => $order->order_number,
            ],
        ];

        $invoiceRes = Http::withHeaders($this->headers)
            ->post("{$this->baseUrl}/checkout-invoice/create", $invoicePayload);

        Log::info('PayDunya Mobile — create invoice', ['status' => $invoiceRes->status(), 'body' => $invoiceRes->body()]);

        if (!$invoiceRes->successful() || $invoiceRes->json('response_code') !== '00') {
            $order->forceDelete();
            return response()->json(['message' => 'Impossible de créer la facture.'], 502);
        }

        $invoiceData = $invoiceRes->json();
        $invoiceToken = $invoiceData['token'] ?? null;
        if (!$invoiceToken) {
            $order->forceDelete();
            return response()->json(['message' => 'Token de facture introuvable.'], 502);
        }

        $order->update(['paydunya_token' => $invoiceToken]);

        /* ── Étape 2 : SoftPay — push mobile ── */
        $softpayRes = Http::withHeaders($this->headers)
            ->post("{$this->baseUrl}/softpay/{$network}", [
                'account_alias' => $phone,
                'token'         => $invoiceToken,
            ]);

        Log::info('PayDunya SoftPay', [
            'network' => $network,
            'phone'   => $phone,
            'status'  => $softpayRes->status(),
            'body'    => $softpayRes->body(),
        ]);

        $spData = $softpayRes->json() ?? [];

        /* SoftPay disponible et réussi → le client reçoit un push */
        if ($softpayRes->successful() && ($spData['response_code'] ?? '') === '00') {
            return response()->json([
                'message'      => 'Demande envoyée. Validez sur votre téléphone.',
                'order_number' => $order->order_number,
            ]);
        }

        /* Fallback : SoftPay indisponible (sandbox ou réseau non configuré)
           → retourner l'URL de la facture pour que le client paie sur PayDunya */
        $isSandbox  = str_contains($this->baseUrl, 'sandbox');
        $prefix     = $isSandbox ? 'sandbox-' : '';
        $invoiceUrl = "https://paydunya.com/{$prefix}checkout/invoice/{$invoiceToken}";

        Log::warning('PayDunya SoftPay fallback — redirection vers la facture', [
            'network'     => $network,
            'response_code' => $spData['response_code'] ?? 'N/A',
            'response_text' => $spData['response_text'] ?? 'N/A',
            'invoice_url' => $invoiceUrl,
        ]);

        return response()->json([
            'message'      => 'Redirection vers le paiement Mobile Money.',
            'order_number' => $order->order_number,
            'invoice_url'  => $invoiceUrl,
        ]);
    }

    public function syncPending()
    {
        $pending = Order::where('payment_method', 'paydunya')
            ->where('payment_status', 'pending')
            ->whereNotNull('paydunya_token')
            ->get();

        $updated = 0;

        foreach ($pending as $order) {
            $response = Http::withHeaders($this->headers)
                ->get("{$this->baseUrl}/checkout-invoice/confirm/{$order->paydunya_token}");

            $data          = $response->json();
            $invoiceStatus = data_get($data, 'invoice.status') ?? data_get($data, 'status');

            if ($invoiceStatus === 'completed') {
                $order->update(['payment_status' => 'paid']);
                $updated++;
            }
        }

        return response()->json([
            'checked' => $pending->count(),
            'updated' => $updated,
        ]);
    }

    public function verify(Request $request)
    {
        $request->validate(['order_number' => 'required|string']);

        $order = Order::where('order_number', $request->input('order_number'))->firstOrFail();

        if ($order->payment_status === 'paid') {
            return response()->json([
                'payment_status' => 'paid',
                'status'         => $order->status,
            ]);
        }

        if (!$order->paydunya_token) {
            return response()->json([
                'payment_status' => $order->payment_status,
                'status'         => $order->status,
            ]);
        }

        $response = Http::withHeaders($this->headers)
            ->get("{$this->baseUrl}/checkout-invoice/confirm/{$order->paydunya_token}");

        Log::info('PayDunya verify', ['status' => $response->status(), 'body' => $response->body()]);

        $data          = $response->json();
        $invoiceStatus = data_get($data, 'invoice.status') ?? data_get($data, 'status');

        if ($invoiceStatus === 'completed') {
            // On met seulement le paiement à jour — l'admin confirme manuellement la commande
            $order->update(['payment_status' => 'paid']);
        }

        return response()->json([
            'payment_status' => $order->fresh()->payment_status,
            'status'         => $order->fresh()->status,
        ]);
    }

    public function ipn(Request $request)
    {
        $hash = $request->input('hash');
        $expectedHash = hash('sha512', config('services.paydunya.master_key'));

        if ($hash !== $expectedHash) {
            Log::warning('PayDunya IPN: invalid hash');
            return response()->json(['error' => 'Invalid hash'], 403);
        }

        $data   = $request->input('data', []);
        $token  = data_get($data, 'invoice.token');
        $status = data_get($data, 'invoice.status');

        if ($token && $status === 'completed') {
            $order = Order::where('paydunya_token', $token)->first();
            if ($order) {
                $order->update([
                    'payment_status' => 'paid',
                    'status'         => 'confirmed',
                ]);
            }
        }

        return response()->json(['ok' => true]);
    }
}
