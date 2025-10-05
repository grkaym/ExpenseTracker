<?php

use App\Actions\ProcessRecurringRule;
use App\Actions\DeleteDemoData;
use Illuminate\Support\Facades\Schedule;

// Delete demo user and demo data
Schedule::call(new DeleteDemoData)->hourly();

// Regist recurring transactions
Schedule::call(new ProcessRecurringRule)->daily();
