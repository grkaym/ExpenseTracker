<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'category_id',
        'date',
        'type',
        'amount',
        'note',
    ];

    /**
     * relationship for User model
     */
    public function users(): BelongsTo
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

    /**
     * Scope a query to only include transactions type of 'income'.
     */
    public function scopeIncome(Builder $query): Builder
    {
        return $query->where('type', '=', 'income');
    }

    /**
     * Scope a query to only include transactions type of 'expense'.
     */
    public function scopeExpense(Builder $query): Builder
    {
        return $query->where('type', '=', 'expense');
    }

    /**
     * Scope a query to only include specific user.
     */
    public function scopeForUser(Builder $query, int $userId): Builder
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope a query to filter date from
     */
    public function scopeFromDate(Builder $query, ?string $from): Builder
    {
        return $from !== null && $from !== ''
            ? $query->where('date', '>=', $from)
            : $query;
    }

    /**
     * Scope a query to filter date to
     */
    public function scopeToDate(Builder $query, ?string $to): Builder
    {
        return $to !== null && $to !== ''
            ? $query->where('date', '<=', $to)
            : $query;
    }

    /**
     * Scope a query to filter category
     */
    public function scopeCategory(Builder $query, ?string $category): Builder
    {
        return ($category && $category !== 'all')
            ? $query->where('category_id', $category)
            : $query;
    }

    /**
     * Scope a query to filter type
     */
    public function scopeType(Builder $query, ?string $type): Builder
    {
        return ($type && $type !== 'both')
            ? $query->where('type', $type)
            : $query;
    }

    /**
     * Scope a query to sort by date
     */
    public function scopeSortByDate(Builder $query, ?string $sort = 'newest'): Builder
    {
        $query->orderBy('date', $sort === 'newest' ? 'desc' : 'asc');

        return $query->orderBy('created_at', $sort === 'newest' ? 'desc' : 'asc');
    }

    /**
     * Scope a query to filter at once
     */
    public function scopeFilter(Builder $query, array $filters): Builder
    {
        return $query->fromDate($filters['from'] ?? null)
            ->toDate($filters['to'] ?? null)
            ->category($filters['category'] ?? null)
            ->type($filters['type'] ?? null)
            ->sortByDate($filters['sort'] ?? 'newest');
    }

    /**
     * Scope a query to only include specific month.
     */
    public function scopeInMonth(Builder $query, Carbon $month): Builder
    {
        return $query->whereBetween('date', [
            $month->copy()->startOfMonth()->toDateString(),
            $month->copy()->endOfMonth()->toDateString(),
        ]);
    }
}
