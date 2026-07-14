<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeliveryZone extends Model
{
    protected $fillable = [
        'name',
        'fee',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'fee'        => 'decimal:2',
        'is_active'  => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Tarif de livraison pour une commune, calculé côté serveur
     * (ne jamais faire confiance à un tarif envoyé par le client).
     */
    public static function feeFor(?string $commune): float
    {
        if (!$commune) {
            return 0.0;
        }

        $zone = static::where('is_active', true)
            ->whereRaw('LOWER(name) = ?', [mb_strtolower(trim($commune))])
            ->first();

        if ($zone) {
            return (float) $zone->fee;
        }

        $fallback = static::where('is_active', true)->where('name', 'Autre')->first();

        return $fallback ? (float) $fallback->fee : 0.0;
    }
}
