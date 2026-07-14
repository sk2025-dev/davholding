<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Executer les seeders pour les donnees de base.
        $this->call([
            AdminUserSeeder::class,
            ConsultingAdminUserSeeder::class,
            CategorySeeder::class,
            // ProductSeeder::class, // désactivé : produits de démo sans image, supprimés du site le 2026-07-14
            PromotionSeeder::class,
            RdvSeeder::class,
            BeautyServiceSeeder::class,
            ConsultingRealisationSeeder::class,
            ConsultingHeroSlideSeeder::class,
            ConsultingSectionImageSeeder::class,
            DeliveryZoneSeeder::class,
        ]);
    }
}
