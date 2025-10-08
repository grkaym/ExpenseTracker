<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{
    BelongsTo, HasMany, HasOne, BelongsToMany
};

class Category extends Model
{
    use HasFactory;

    // ===== [Attributes / Casts] ================================================================
    protected $fillable = [
        'name',
        'type',
        'color',
    ];
    protected $casts = [];


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
     * relationship for Transaction model
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * relationship for RecurringRule model
     */
    public function recurringRules(): HasMany
    {
        return $this->hasMany(RecurringRule::class);
    }


    // ===== [Scopes] ===========================================================================
    /**
     * Scope a query to only include specific type.
     */
    public function scopeType(Builder $query, string $type): Builder
    {
        return $query->where('type', $type);
    }

    /**
     * Scope a query to only include specific user.
     */
    public function scopeForUser(Builder $query, int $userId): Builder
    {
        // Records with a 'null' value in the 'user_id' column are common categories to all users.
        return $query->where(function ($q) use ($userId) {
            $q->whereNull('user_id')
                ->orWhere('user_id', $userId);
        });
    }


    // ===== [Accessors / Mutators] ==============================================================
    // public function getDisplayNameAttribute(): string { return $this->name ?: '(no name)'; }


    // ===== [Domain Logic] =====================================================================

}