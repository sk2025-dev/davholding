<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageStat extends Model
{
    protected $fillable = ['path', 'title', 'view_count', 'share_count', 'capture_count', 'last_activity_at'];

    protected $casts = [
        'view_count' => 'integer',
        'share_count' => 'integer',
        'capture_count' => 'integer',
        'last_activity_at' => 'datetime',
    ];
}
