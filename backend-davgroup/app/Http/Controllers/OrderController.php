<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /* ── Admin : liste toutes les commandes ── */
    public function index(Request $request)
    {
        $query = Order::with('user')->orderByDesc('created_at');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('payment_status')) {
            $query->where('payment_status', $request->payment_status);
        }

        if ($request->filled('search')) {
            $q = $request->search;
            $query->where(function ($qb) use ($q) {
                $qb->where('order_number', 'like', "%{$q}%")
                   ->orWhere('client_name',  'like', "%{$q}%")
                   ->orWhere('client_email', 'like', "%{$q}%")
                   ->orWhere('client_phone', 'like', "%{$q}%");
            });
        }

        $orders = $query->paginate($request->input('per_page', 20));

        return response()->json([
            'data'  => $orders->items(),
            'total' => $orders->total(),
            'page'  => $orders->currentPage(),
            'last_page' => $orders->lastPage(),
        ]);
    }

    /* ── Admin : détail d'une commande ── */
    public function show(Order $order)
    {
        $order->load('user');
        $items = [];
        if ($order->notes) {
            $decoded = json_decode($order->notes, true);
            if (is_array($decoded)) $items = $decoded;
        }

        return response()->json([
            'data'  => $order,
            'items' => $items,
        ]);
    }

    /* ── Admin : changer le statut ── */
    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,processing,shipped,delivered,cancelled',
        ]);

        $status = $request->status;

        if ($status === 'shipped') {
            $order->markAsShipped();
        } elseif ($status === 'delivered') {
            $order->markAsDelivered();
        } elseif ($status === 'cancelled') {
            $order->cancel();
        } else {
            $order->update(['status' => $status]);
        }

        return response()->json(['data' => $order->fresh()]);
    }

    /* ── Client : passer une commande livraison ── */
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

        $user        = $request->user();
        $items       = $request->input('items');
        $subtotal    = collect($items)->sum(fn($i) => $i['unitPrice'] * $i['quantity']);
        $deliveryFee = (float) ($request->input('delivery_fee', 0));
        $total       = $subtotal + $deliveryFee;

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
