<?php

namespace Database\Seeders;

use App\Models\ConsultingSectionImage;
use Illuminate\Database\Seeder;

class ConsultingSectionImageSeeder extends Seeder
{
    /**
     * Reprend les photos codées en dur des sections "Ce que nous faisons"
     * (design, IT, mobile) pour que l'admin ait une valeur de départ à remplacer.
     */
    public function run(): void
    {
        $defaults = [
            'design' => '/consulting/images/graphiste.png',
            'it'     => '/consulting/images/it.png',
            'mobile' => '/consulting/images/coding.png',
        ];

        foreach ($defaults as $sectionKey => $imagePath) {
            ConsultingSectionImage::firstOrCreate(
                ['section_key' => $sectionKey],
                ['image_path' => $imagePath],
            );
        }
    }
}
