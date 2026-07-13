<?php

namespace Database\Seeders;

use App\Models\ConsultingRealisation;
use Illuminate\Database\Seeder;

class ConsultingRealisationSeeder extends Seeder
{
    /**
     * Reprend les réalisations codées en dur dans les pages Consulting
     * (ConsultingBrandingPage, ConsultingDesignPage, ConsultingDevPage)
     * pour que les galeries ne soient pas vides une fois branchées sur l'API.
     */
    public function run(): void
    {
        $branding = [
            ['image_path' => 'https://i.pinimg.com/736x/3f/1b/93/3f1b93539250e243cbeee6004a67b3e4.jpg', 'title' => 'Cartes de visite', 'tag' => 'Print'],
            ['image_path' => 'https://i.pinimg.com/736x/da/7b/ac/da7bac0340ae7acd5b7f2b5346d252c9.jpg', 'title' => 'Flyers et Tracts', 'tag' => 'Print'],
            ['image_path' => '/consulting/images/dac.png', 'title' => 'Identité visuelle DAC', 'tag' => 'Branding'],
            ['image_path' => 'https://i.pinimg.com/1200x/06/5c/b0/065cb0ec950d3ef9d886df28ce7680e4.jpg', 'title' => 'Brochures et Revues', 'tag' => 'Édition'],
            ['image_path' => '/consulting/images/ticket.jpeg', 'title' => "Ticket d'entrée", 'tag' => 'Print'],
            ['image_path' => 'https://i.pinimg.com/1200x/ff/7e/71/ff7e71602d8bd17a4bb102d926428805.jpg', 'title' => 'Étiquettes et Autocollants', 'tag' => 'Print'],
            ['image_path' => 'https://i.pinimg.com/webp/1200x/f4/a5/ef/f4a5ef1819c8e2741cb20b2a9056eb97.webp', 'title' => 'Panneaux, Affiches', 'tag' => 'Signalétique'],
            ['image_path' => 'https://i.pinimg.com/1200x/a9/85/2b/a9852b73cf86318c7b4b4b4631c78056.jpg', 'title' => 'Bâches publicitaires', 'tag' => 'Signalétique'],
        ];

        $design = [
            ['image_path' => '/consulting/images/maquetteb.jpg', 'title' => 'Design UI Application', 'tag' => 'UI Design', 'tags' => ['Figma', 'UI Kit']],
            ['image_path' => '/consulting/images/maquettec.jpg', 'title' => 'Design E-commerce', 'tag' => 'UX Design', 'tags' => ['Figma', 'Wireframe']],
            ['image_path' => '/consulting/images/maquetted.jpg', 'title' => 'Design Dashboard', 'tag' => 'UI Design', 'tags' => ['Figma', 'Design System']],
            ['image_path' => '/consulting/images/maquettee.jpg', 'title' => 'Design App Mobile', 'tag' => 'UI/UX Design', 'tags' => ['Figma', 'Prototype']],
            ['image_path' => '/consulting/images/maquettei.jpg', 'title' => 'Design Site Vitrine', 'tag' => 'UX Design', 'tags' => ['Figma', 'Wireframe']],
            ['image_path' => '/consulting/images/maquettex.jpg', 'title' => 'Design Plateforme Web', 'tag' => 'UI Design', 'tags' => ['Figma', 'UI Kit']],
            ['image_path' => '/consulting/images/maquettey.jpg', 'title' => 'Design Interface SaaS', 'tag' => 'UI/UX Design', 'tags' => ['Figma', 'Design System']],
            ['image_path' => '/consulting/images/siteweb.png', 'title' => 'Design Site Corporate', 'tag' => 'UX Design', 'tags' => ['Figma', 'Prototype']],
        ];

        $developpement = [
            ['image_path' => '/consulting/images/home.jpg', 'title' => 'Site Vitrine Corporate', 'tag' => 'web', 'tags' => ['Vue.js', 'PHP']],
            ['image_path' => '/consulting/images/appvert.jpg', 'title' => 'App Mobile Flutter', 'tag' => 'mobile', 'tags' => ['Flutter', 'Firebase']],
            ['image_path' => '/consulting/images/commerce.jpg', 'title' => 'Boutique en ligne', 'tag' => 'web', 'tags' => ['Laravel', 'MySQL']],
            ['image_path' => '/consulting/images/connectviolet.jpg', 'title' => 'Application iOS React Native', 'tag' => 'mobile', 'tags' => ['React Native', 'Node.js']],
            ['image_path' => '/consulting/images/dahbleu.jpg', 'title' => 'Dashboard Analytics', 'tag' => 'web', 'tags' => ['Vue JS', 'Chart.js']],
            ['image_path' => '/consulting/images/cartevert.jpg', 'title' => 'App de Géolocalisation', 'tag' => 'mobile', 'tags' => ['Flutter', 'Google Maps']],
            ['image_path' => '/consulting/images/dashvert.jpg', 'title' => 'Plateforme SaaS', 'tag' => 'web', 'tags' => ['React JS', 'Laravel', 'MySQL']],
            ['image_path' => '/consulting/images/maquettea.jpg', 'title' => 'Application Android', 'tag' => 'mobile', 'tags' => ['Flutter', 'Firebase']],
        ];

        $secure = [
            ['image_path' => '/consulting/images/enneu.png', 'title' => 'Vidéosurveillance & caméras IP', 'tag' => 'Vidéosurveillance'],
            ['image_path' => '/consulting/images/enneu.png', 'title' => 'Hébergement de serveurs', 'tag' => 'Hébergement'],
            ['image_path' => '/consulting/images/enneu.png', 'title' => 'Sécurisation des données', 'tag' => 'Sécurité'],
            ['image_path' => '/consulting/images/enneu.png', 'title' => 'Supervision à distance', 'tag' => 'Supervision'],
        ];

        foreach (['branding' => $branding, 'design' => $design, 'developpement' => $developpement, 'secure' => $secure] as $category => $items) {
            foreach ($items as $index => $item) {
                ConsultingRealisation::updateOrCreate(
                    ['category' => $category, 'title' => $item['title']],
                    [
                        'tag'        => $item['tag'] ?? null,
                        'tags'       => $item['tags'] ?? null,
                        'image_path' => $item['image_path'],
                        'sort_order' => $index,
                        'is_active'  => true,
                    ],
                );
            }
        }
    }
}
