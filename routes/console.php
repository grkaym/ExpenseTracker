<?php

use App\Actions\ProcessRecurringRule;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Schedule;

// Delete demo user and demo data
Schedule::call(function () {
    // Valid for 60 minutes
    $validUntil = Carbon::now()->subMinute(60);
    // Delete target users
    User::where('is_demo', true)
        ->where('created_at', '<=', $validUntil)
        ->delete();

})->hourly();

// Regist recurring transactions
Schedule::call(new ProcessRecurringRule)->daily();
