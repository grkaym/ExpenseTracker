<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    // ===== [Attributes / Casts] ================================================================
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_demo',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // ===== [Boot Hooks] =======================================================================
    protected static function booted(): void
    {
        //
    }

    // ===== [Relations] ========================================================================
    /**
     * relationship for Transaction model
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * relationship for Category model
     */
    public function categories(): HasMany
    {
        return $this->hasMany(Category::class);
    }

    /**
     * relationship for RecurringRule model
     */
    public function recurringRules(): HasMany
    {
        return $this->hasMany(RecurringRule::class);
    }

    // ===== [Scopes] ===========================================================================
    // public function scopeActive(Builder $q): Builder { return $q->where('is_active', true); }

    // ===== [Accessors / Mutators] ==============================================================
    // public function getDisplayNameAttribute(): string { return $this->name ?: '(no name)'; }

    // ===== [Domain Logic] =====================================================================

}
