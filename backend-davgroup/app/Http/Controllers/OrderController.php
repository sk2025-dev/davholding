<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function storeDelivery(Request $request)
    {
        $request->validate([
            'items'            => 'required|array|min:1',
            'items.*.title'    => 'required|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unitPrice'=> 'required|numeric|min:0',
            'client_name'      => 'required|string|max:255',
            'client_phone'     => 'required|string|max:30',
            'shipping_address' => 'required|string|max:500',
            'commune'          => 'nullable|string|max:100',
            'delivery_fee'     => 'nullable|numeric|min:0',
        ]);

        $user         = $request->user();
        $items        = $request->input('items');
        $subtotal     = collect($items)->sum(fn($i) => $i['unitPrice'] * $i['quantity']);
        $deliveryFee  = (float) ($request->input('delivery_fee', 0));
        $total        = $subtotal + $deliveryFee;

        $order = Order::create([
            'user_id'          => $user->id,
            'order_number'     => Order::generateOrderNumber(),
            'client_name'      => $request->input('client_name'),
            'client_email'     => $user->email,
            'client_phone'     => $request->input('client_phone'),
            'shipping_address' => $request->input('shipping_address'),
            'subtotal'         => $subtotal,
            'tax'              => 0,
            'shipping'         => $deliveryFee,
            'discount'         => 0,
            'total'            => $total,
            'status'           => 'pending',
            'payment_status'   => 'pending',
            'payment_method'   => 'cash_on_delivery',
            'notes'            => json_encode($items, JSON_UNESCAPED_UNICODE),
        ]);

        return response()->json([
            'order_number' => $order->order_number,
            'message'      => 'Commande enregistrée avec succès.',
        ], 201);
    }
}
