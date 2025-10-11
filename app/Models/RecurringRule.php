<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RecurringRule extends Model
{
    use HasFactory;

    // ===== [Attributes / Casts] ================================================================
    protected $fillable = [];

    protected $casts = [
        'next_run_date' => 'datetime:Y-m-d',
    ];

    // ===== [Boot Hooks] =======================================================================
    protected static function booted(): void
    {
        //
    }

    // ===== [Relations] ========================================================================
    /**
     * relationship for User model
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * relationship for Category model
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    // ===== [Scopes] ===========================================================================
    /**
     * Scope a query to only include specific user.
     */
    public function scopeForUser(Builder $query, int $userId): Builder
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope a query not to include demo user's recurring transaction
     */
    public function scopeNonDemoUser(Builder $query): Builder
    {
        return $query->whereHas('user', function (Builder $q) {
            $q->where('is_demo', false)
                ->orWhereNull('is_demo');
        });
    }

    // ===== [Accessors / Mutators] ==============================================================
    // public function getDisplayNameAttribute(): string { return $this->name ?: '(no name)'; }

    // ===== [Domain Logic] =====================================================================

}
