<?php

namespace App\Http\Controllers;

use App\Models\DeliveryZone;
use Illuminate\Http\Request;

class DeliveryZoneController extends Controller
{
    public function index(Request $request)
    {
        $query = DeliveryZone::query();

        if ($request->boolean('admin')) {
            $user = $request->user('sanctum');
            abort_if(!$user, 401, 'Unauthenticated.');
            abort_if(!$user->tokenCan('manage-davgroup'), 403, 'Cette action est reservee aux administrateurs.');
        } else {
            $query->where('is_active', true);
        }

        $zones = $query->orderBy('sort_order')->orderBy('name')->get();

        return response()->json(['data' => $zones]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'       => ['required', 'string', 'max:100', 'unique:delivery_zones,name'],
            'fee'        => ['required', 'numeric', 'min:0'],
            'is_active'  => ['sometimes', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $zone = DeliveryZone::create([
            'name'       => $data['name'],
            'fee'        => $data['fee'],
            'is_active'  => $data['is_active'] ?? true,
            'sort_order' => $data['sort_order'] ?? 0,
        ]);

        return response()->json(['data' => $zone], 201);
    }

    public function update(Request $request, DeliveryZone $deliveryZone)
    {
        $data = $request->validate([
            'name'       => ['sometimes', 'string', 'max:100', 'unique:delivery_zones,name,' . $deliveryZone->id],
            'fee'        => ['sometimes', 'numeric', 'min:0'],
            'is_active'  => ['sometimes', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $deliveryZone->fill($data);
        $deliveryZone->save();

        return response()->json(['data' => $deliveryZone]);
    }

    public function destroy(DeliveryZone $deliveryZone)
    {
        $deliveryZone->delete();

        return response()->json(['message' => 'Commune supprimée.']);
    }
}
