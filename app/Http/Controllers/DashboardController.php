<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        // Get user id.
        $user = Auth::id();

        // Get this month.
        $month = Carbon::now()->subMonth();

        // Get the amount of income/expense/net.
        $income = Transaction::forUser($user)->inMonth($month)->income()->sum('amount');
        $expense = Transaction::forUser($user)->inMonth($month)->expense()->sum('amount');
        // Calculate net (income - expense) and round to 2 decimal places
        $net = round(((float) $income - (float) $expense), 2);

        return Inertia::render('Dashboard', [
            'income' => $income,
            'expense' => $expense,
            'net' => $net,
        ]);
    }
}
