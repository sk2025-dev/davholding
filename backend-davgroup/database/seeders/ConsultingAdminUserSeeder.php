<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ConsultingAdminUserSeeder extends Seeder
{
    /**
     * Compte admin scopé : accès uniquement aux réalisations Consulting.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => env('CONSULTING_ADMIN_EMAIL', 'admin@davconsulting.com')],
            [
                'name' => env('CONSULTING_ADMIN_NAME', 'Administrateur DAVConsulting'),
                'role' => 'consulting',
                'email_verified_at' => now(),
                'password' => Hash::make(env('CONSULTING_ADMIN_PASSWORD', 'Consulting@2026')),
            ],
        );
    }
}
