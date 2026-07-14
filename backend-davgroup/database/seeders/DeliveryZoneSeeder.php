<?php

namespace Database\Seeders;

use App\Models\DeliveryZone;
use Illuminate\Database\Seeder;

class DeliveryZoneSeeder extends Seeder
{
    /**
     * Reprend les tarifs codés en dur dans CheckoutModal.jsx
     * pour que l'admin ait une base de départ à ajuster.
     */
    public function run(): void
    {
        $zones = [
            'Plateau'       => 1000,
            'Treichville'   => 1000,
            'Marcory'       => 1500,
            'Koumassi'      => 2000,
            'Port-Bouët'    => 2000,
            'Cocody'        => 2000,
            'Adjamé'        => 2000,
            'Attécoubé'     => 2500,
            'Deux-Plateaux' => 2500,
            'Riviera'       => 2500,
            'Yopougon'      => 2000,
            'Abobo'         => 2000,
            'Anyama'        => 2000,
            'Bingerville'   => 2500,
            'Songon'        => 2500,
            'Grand-Bassam'  => 3000,
            'Autre'         => 3500,
        ];

        $sortOrder = 0;
        foreach ($zones as $name => $fee) {
            DeliveryZone::firstOrCreate(
                ['name' => $name],
                ['fee' => $fee, 'is_active' => true, 'sort_order' => $sortOrder],
            );
            $sortOrder++;
        }
    }
}
