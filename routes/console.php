<?php

use App\Actions\DeleteDemoData;
use App\Actions\ProcessRecurringRule;
use Illuminate\Support\Facades\Schedule;

// Delete demo user and demo data
Schedule::call(new DeleteDemoData)->hourly();

// Regist recurring transactions
Schedule::call(new ProcessRecurringRule)->daily();
