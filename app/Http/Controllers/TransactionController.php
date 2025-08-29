<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Transaction;
use Auth;

class TransactionController extends Controller
{
    /**
     * Display the list of all transactions.
     */
    public function index()
    {
        // Get login user's id.
        $userId = Auth::id();
        // Get all transactions.
        $transactions = Transaction::with('category')
                        ->forUser($userId)
                        ->get();
        return Inertia::render('Transactions', [
            'transactions' => $transactions,
        ]);
    }
}
