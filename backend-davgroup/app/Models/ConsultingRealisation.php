<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ConsultingRealisation extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'category',
        'tag',
        'title',
        'description',
        'image_path',
        'tags',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active'  => 'boolean',
        'sort_order' => 'integer',
        'tags'       => 'array',
    ];
}
