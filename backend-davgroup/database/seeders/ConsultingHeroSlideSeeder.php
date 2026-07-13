<?php

namespace Database\Seeders;

use App\Models\ConsultingHeroSlide;
use Illuminate\Database\Seeder;

class ConsultingHeroSlideSeeder extends Seeder
{
    /**
     * Reprend les 4 slides codées en dur dans ConsultingHeroCarousel.jsx
     * pour que le carrousel ne soit pas vide une fois branché sur l'API.
     */
    public function run(): void
    {
        $slides = [
            [
                'tab_label' => 'Présentation',
                'tag' => 'Agence digitale · Abidjan, CI',
                'headline' => "Construisons\nle digital de",
                'headline_highlight' => 'demain.',
                'subtitle' => "Solutions web, mobile et design sur-mesure pour les entreprises qui veulent avancer. Laravel, Flutter, React — livré avec précision.",
                'bullets' => null,
                'cta_primary_label' => 'Démarrer un projet',
                'cta_primary_link' => '#contact',
                'cta_secondary_label' => 'Voir nos réalisations',
                'cta_secondary_link' => '#realisations',
                'image_path' => '/consulting/images/femmedev.png',
                'sort_order' => 0,
            ],
            [
                'tab_label' => 'Développement',
                'tag' => 'Développement',
                'headline' => "Du code qui fait\nla",
                'headline_highlight' => 'différence.',
                'subtitle' => "Sites web, applications mobiles et systèmes sur-mesure. Nous transformons vos idées en solutions digitales robustes — Laravel, Flutter, React, Vue.",
                'bullets' => [
                    'Développement web & mobile',
                    'Conseil & accompagnement digital',
                    'Formalisation des besoins & cahiers des charges',
                    'Intégration de systèmes & APIs',
                ],
                'cta_primary_label' => 'Démarrer un projet',
                'cta_primary_link' => '#contact',
                'cta_secondary_label' => 'Nos services',
                'cta_secondary_link' => '#services',
                'image_path' => '/consulting/images/faveur.png',
                'sort_order' => 1,
            ],
            [
                'tab_label' => 'Design',
                'tag' => 'Branding & Design',
                'headline' => "Votre identité,",
                'headline_highlight' => 'magnifiée.',
                'subtitle' => "Création de logo, charte graphique, flyers, templates Canva/Figma",
                'bullets' => [
                    'Création de logo & charte graphique',
                    'Flyers, affiches, roll-ups, brochures',
                    'Templates Canva & Figma',
                    'Communication digitale & shooting photo',
                ],
                'cta_primary_label' => 'Démarrer un projet',
                'cta_primary_link' => '#contact',
                'cta_secondary_label' => 'Nos services',
                'cta_secondary_link' => '#services',
                'image_path' => '/consulting/images/design.png',
                'sort_order' => 2,
            ],
            [
                'tab_label' => 'IT & Infra',
                'tag' => 'IT & Infrastructure',
                'headline' => "Sécurisez votre",
                'headline_highlight' => 'infrastructure.',
                'subtitle' => "Vidéosurveillance, hébergement serveur, sécurisation des données — nous protégeons et optimisons votre système IT de bout en bout.",
                'bullets' => [
                    'Vidéosurveillance & caméras IP',
                    'Location & hébergement de serveurs',
                    'Sécurisation des données',
                    'Supervision à distance',
                ],
                'cta_primary_label' => 'Démarrer un projet',
                'cta_primary_link' => '#contact',
                'cta_secondary_label' => 'Nos services',
                'cta_secondary_link' => '#services',
                'image_path' => '/consulting/images/enneu.png',
                'sort_order' => 3,
            ],
        ];

        foreach ($slides as $slide) {
            ConsultingHeroSlide::updateOrCreate(
                ['tab_label' => $slide['tab_label']],
                array_merge($slide, ['is_active' => true]),
            );
        }
    }
}
