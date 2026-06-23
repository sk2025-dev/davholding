<?php

namespace App\Http\Controllers;

use App\Models\Promo;
use App\Models\Setting;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PromoController extends Controller
{
    /* ── Public : texte de la barre promo ── */
    public function promoBar()
    {
        $text = Setting::get('promo_bar_text', '✦ Livraison offerte à partir de 25 000 FCFA d\'achat ✦ Code : DAVBEAUTE');
        return response()->json(['text' => $text]);
    }

    /* ── Public : promos actives (pour les badges produits) ── */
    public function active()
    {
        $today = Carbon::today()->toDateString();
        $promos = Promo::where('is_active', true)
            ->where('start_date', '<=', $today)
            ->where('end_date', '>=', $today)
            ->get()
            ->map(fn($p) => [
                'id'            => $p->id,
                'code'          => $p->code,
                'discount_type' => $p->discount_type,
                'value'         => $p->value,
                'label'         => $p->label,
            ]);

        return response()->json(['data' => $promos]);
    }

    /* ── Public : valider un code promo ── */
    public function validate(Request $request)
    {
        $request->validate(['code' => 'required|string']);

        $promo = Promo::where('code', strtoupper($request->code))->first();

        if (!$promo || !$promo->isValid()) {
            return response()->json(['valid' => false, 'message' => 'Code invalide ou expiré'], 422);
        }

        return response()->json([
            'valid'         => true,
            'code'          => $promo->code,
            'discount_type' => $promo->discount_type,
            'value'         => $promo->value,
            'label'         => $promo->label,
        ]);
    }

    /* ── Admin : liste complète ── */
    public function index()
    {
        $promos = Promo::orderByDesc('created_at')->get();
        return response()->json(['data' => $promos]);
    }

    /* ── Admin : créer ── */
    public function store(Request $request)
    {
        $data = $request->validate([
            'code'          => 'required|string|unique:promos,code',
            'discount_type' => 'required|in:percent,amount',
            'value'         => 'required|numeric|min:0',
            'start_date'    => 'required|date',
            'end_date'      => 'required|date|after_or_equal:start_date',
            'is_active'     => 'boolean',
            'usage_limit'   => 'nullable|integer|min:1',
        ]);

        $data['code'] = strtoupper($data['code']);
        $promo = Promo::create($data);

        return response()->json(['data' => $promo], 201);
    }

    /* ── Admin : modifier ── */
    public function update(Request $request, Promo $promo)
    {
        $data = $request->validate([
            'code'          => 'sometimes|string|unique:promos,code,' . $promo->id,
            'discount_type' => 'sometimes|in:percent,amount',
            'value'         => 'sometimes|numeric|min:0',
            'start_date'    => 'sometimes|date',
            'end_date'      => 'sometimes|date',
            'is_active'     => 'sometimes|boolean',
            'usage_limit'   => 'nullable|integer|min:1',
        ]);

        if (isset($data['code'])) $data['code'] = strtoupper($data['code']);
        $promo->update($data);

        return response()->json(['data' => $promo]);
    }

    /* ── Admin : supprimer ── */
    public function destroy(Promo $promo)
    {
        $promo->delete();
        return response()->json(['message' => 'Supprimé']);
    }

    /* ── Admin : sauvegarder le texte de la barre ── */
    public function savePromoBar(Request $request)
    {
        $request->validate(['text' => 'required|string|max:500']);
        Setting::set('promo_bar_text', $request->text);
        return response()->json(['text' => $request->text]);
    }
}
