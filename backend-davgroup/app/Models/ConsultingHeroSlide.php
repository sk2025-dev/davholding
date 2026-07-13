<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ConsultingHeroSlide extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'tag',
        'tab_label',
        'headline',
        'headline_highlight',
        'subtitle',
        'bullets',
        'cta_primary_label',
        'cta_primary_link',
        'cta_secondary_label',
        'cta_secondary_link',
        'image_path',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active'  => 'boolean',
        'sort_order' => 'integer',
        'bullets'    => 'array',
    ];
}
