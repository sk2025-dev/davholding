<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatbotMessage extends Model
{
    protected $fillable = [
        'session_id',
        'page',
        'question',
        'answer',
        'intent',
        'understood',
        'helpful',
    ];

    protected $casts = [
        'understood' => 'boolean',
        'helpful' => 'boolean',
    ];
}
