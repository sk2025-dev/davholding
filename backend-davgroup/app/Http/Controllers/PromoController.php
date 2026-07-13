<?php

namespace App\Http\Controllers;

use App\Models\Promo;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class PromoController extends Controller
{
    /* ── Public : texte de la barre promo ── */
    public function promoBar()
    {
        $text = Setting::get('promo_bar_text', '✦ Livraison offerte à partir de 25 000 FCFA d\'achat ✦ Code : DAVBEAUTE');
        return response()->json(['text' => $text]);
    }

    /* ── Public : promos actives ── */
    public function active()
    {
        $today = Carbon::today()->toDateString();
        $promos = Promo::with('products:id')
            ->where('is_active', true)
            ->where('start_date', '<=', $today)
            ->where('end_date', '>=', $today)
            ->get()
            ->map(fn($p) => [
                'id'            => $p->id,
                'code'          => $p->code,
                'description'   => $p->description,
                'discount_type' => $p->discount_type,
                'value'         => $p->value,
                'label'         => $p->label,
                'image_url'     => $p->image_path ? asset('storage/' . $p->image_path) : null,
                'product_ids'   => $p->products->pluck('id'),
            ]);

        return response()->json(['data' => $promos]);
    }

    /* ── Public : valider un code promo ── */
    public function validate(Request $request)
    {
        $request->validate(['code' => 'required|string']);

        $promo = Promo::with('products:id')
            ->where('code', strtoupper($request->code))
            ->first();

        if (!$promo || !$promo->isValid()) {
            return response()->json(['valid' => false, 'message' => 'Code invalide ou expiré'], 422);
        }

        return response()->json([
            'valid'         => true,
            'code'          => $promo->code,
            'discount_type' => $promo->discount_type,
            'value'         => $promo->value,
            'label'         => $promo->label,
            'product_ids'   => $promo->products->pluck('id'),
        ]);
    }

    /* ── Admin : liste complète ── */
    public function index()
    {
        $promos = Promo::with('products:id,name,image')
            ->orderByDesc('created_at')
            ->get()
            ->map(fn($p) => array_merge($p->toArray(), [
                'image_url' => $p->image_path ? asset('storage/' . $p->image_path) : null,
                'products'  => $p->products->map(fn($pr) => [
                    'id'    => $pr->id,
                    'name'  => $pr->name,
                    'image' => $pr->image,
                ]),
            ]));

        return response()->json(['data' => $promos]);
    }

    /* ── Admin : créer ── */
    public function store(Request $request)
    {
        $data = $request->validate([
            'code'          => 'required|string|unique:promos,code',
            'description'   => 'nullable|string|max:500',
            'discount_type' => 'required|in:percent,amount',
            'value'         => 'required|numeric|min:0',
            'start_date'    => 'required|date',
            'end_date'      => 'required|date|after_or_equal:start_date',
            'is_active'     => 'boolean',
            'usage_limit'   => 'nullable|integer|min:1',
            'product_ids'   => 'nullable|array',
            'product_ids.*' => 'integer|exists:products,id',
            'image'         => 'nullable|image|max:6144',
        ]);

        $data['code'] = strtoupper($data['code']);
        $productIds = $data['product_ids'] ?? [];
        unset($data['product_ids']);

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('promos', 'public');
        }
        unset($data['image']);

        // Vérifier qu'aucun produit sélectionné n'a déjà une promo active
        if (!empty($productIds)) {
            $today = Carbon::today()->toDateString();
            $conflicts = DB::table('promo_product')
                ->join('promos', 'promos.id', '=', 'promo_product.promo_id')
                ->join('products', 'products.id', '=', 'promo_product.product_id')
                ->whereIn('promo_product.product_id', $productIds)
                ->where('promos.is_active', true)
                ->where('promos.start_date', '<=', $today)
                ->where('promos.end_date', '>=', $today)
                ->select('products.name')
                ->get();

            if ($conflicts->isNotEmpty()) {
                $names = $conflicts->pluck('name')->join(', ');
                return response()->json([
                    'message' => "Ces produits ont déjà une promotion active : {$names}",
                    'errors'  => ['product_ids' => ["Promotion déjà active sur : {$names}"]],
                ], 422);
            }
        }

        $promo = Promo::create($data);

        if (!empty($productIds)) {
            $promo->products()->sync($productIds);
        }

        $promo->load('products:id,name,image');

        return response()->json(['data' => array_merge($promo->toArray(), [
            'image_url' => $promo->image_path ? asset('storage/' . $promo->image_path) : null,
        ])], 201);
    }

    /* ── Admin : modifier ── */
    public function update(Request $request, Promo $promo)
    {
        $data = $request->validate([
            'code'          => 'sometimes|string|unique:promos,code,' . $promo->id,
            'description'   => 'nullable|string|max:500',
            'discount_type' => 'sometimes|in:percent,amount',
            'value'         => 'sometimes|numeric|min:0',
            'start_date'    => 'sometimes|date',
            'end_date'      => 'sometimes|date',
            'is_active'     => 'sometimes|boolean',
            'usage_limit'   => 'nullable|integer|min:1',
            'product_ids'   => 'nullable|array',
            'product_ids.*' => 'integer|exists:products,id',
            'image'         => 'nullable|image|max:6144',
        ]);

        if (isset($data['code'])) $data['code'] = strtoupper($data['code']);

        if ($request->hasFile('image')) {
            if ($promo->image_path) {
                Storage::disk('public')->delete($promo->image_path);
            }
            $data['image_path'] = $request->file('image')->store('promos', 'public');
        }
        unset($data['image']);

        $productIds = $data['product_ids'] ?? null;
        unset($data['product_ids']);

        $promo->update($data);

        if ($productIds !== null) {
            $promo->products()->sync($productIds);
        }

        $promo->load('products:id,name,image');

        return response()->json(['data' => array_merge($promo->toArray(), [
            'image_url' => $promo->image_path ? asset('storage/' . $promo->image_path) : null,
        ])]);
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
