<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Promo extends Model
{
    protected $fillable = [
        'code', 'discount_type', 'value',
        'start_date', 'end_date', 'is_active',
        'usage_limit', 'used_count',
    ];

    protected $casts = [
        'is_active'   => 'boolean',
        'start_date'  => 'date',
        'end_date'    => 'date',
        'value'       => 'decimal:2',
        'usage_limit' => 'integer',
        'used_count'  => 'integer',
    ];

    public function isValid(): bool
    {
        if (!$this->is_active) return false;

        $today = Carbon::today();
        if ($today->lt($this->start_date) || $today->gt($this->end_date)) return false;

        if ($this->usage_limit && $this->used_count >= $this->usage_limit) return false;

        return true;
    }

    public function getLabelAttribute(): string
    {
        return $this->discount_type === 'percent'
            ? "-{$this->value}%"
            : '-' . number_format($this->value, 0, ',', ' ') . ' FCFA';
    }
}
