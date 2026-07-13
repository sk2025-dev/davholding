<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConsultingSectionImage extends Model
{
    protected $fillable = [
        'section_key',
        'image_path',
    ];
}
