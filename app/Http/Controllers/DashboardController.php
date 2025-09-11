<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        // Get user id
        $user = Auth::id();

        // Get this month
        $month = Carbon::now()->subMonth();

        // Get the amount of income/expense/net
        $income = Transaction::forUser($user)->inMonth($month)->income()->sum('amount');
        $expense = Transaction::forUser($user)->inMonth($month)->expense()->sum('amount');
        // Calculate net (income - expense) and round to 2 decimal places
        $net = round(((float) $income - (float) $expense), 2);

        // Get transactions for the combo chart
        $transactions = Transaction::selectRaw('
                DATE_FORMAT(date, "%Y-%m") as ym,
                SUM(CASE WHEN type = "expense" THEN amount ELSE 0 END) as expense_total,
                SUM(CASE WHEN type = "income" THEN amount ELSE 0 END) as income_total
            ')
                ->forUser($user)
                ->groupBy('ym')
                ->orderBy('ym')
                ->get();

        return Inertia::render('Dashboard', [
            'income' => $income,
            'expense' => $expense,
            'net' => $net,
            'transactions' => $transactions,
        ]);
    }
}
