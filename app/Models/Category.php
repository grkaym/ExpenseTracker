<?php

namespace App\Models;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class Category extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'type',
        'color',
    ];

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
     * Scope a query to only include specific user.
     */
    public function scopeForUser(Builder $query, int $userId): Builder
    {
        // Records with a 'null' value in the 'user_id' column are common categories to all users.  
        return $query->where('user_id', $userId)->orWhere('user_id', null);
    }
}
