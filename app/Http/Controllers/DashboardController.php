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
        $userId = Auth::id();

        // Get Carbon now
        $month = Carbon::now();

        // Get the amount of income/expense/net
        $income = Transaction::forUser($userId)->inMonth($month)->income()->sum('amount');
        $expense = Transaction::forUser($userId)->inMonth($month)->expense()->sum('amount');
        // Calculate net (income - expense) and round to 2 decimal places
        $net = round(((float) $income - (float) $expense), 2);

        // Get transactions for the combo chart
        $chartData = Transaction::selectRaw('
                DATE_FORMAT(date, "%Y-%m") as ym,
                SUM(CASE WHEN type = "expense" THEN amount ELSE 0 END) as expense_total,
                SUM(CASE WHEN type = "income" THEN amount ELSE 0 END) as income_total
            ')
            ->forUser($userId)
            ->groupBy('ym')
            ->orderBy('ym')
            ->limit(5)
            ->get();

        // Get transactions registered recently
        $recentTrans = Transaction::with('category')
            ->forUser($userId)
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Get expense transactions grouped by category
        $pieData = Transaction::selectRaw('categories.name, categories.color, CAST(SUM(transactions.amount) AS DOUBLE) as value')
            ->join('categories', 'transactions.category_id', '=', 'categories.id')
            ->where('transactions.user_id', $userId)
            ->where('categories.type', 'expense')
            ->whereBetween('date', [
                $month->copy()->startOfMonth()->toDateString(),
                $month->copy()->endOfMonth()->toDateString(),
            ])
            ->groupBy('category_id')
            ->orderBy('value', 'desc')
            ->get();

        return Inertia::render('Dashboard', [
            'income' => $income,
            'expense' => $expense,
            'net' => $net,
            'chartData' => $chartData,
            'recentTrans' => $recentTrans,
            'pieData' => $pieData,
        ]);
    }
}
