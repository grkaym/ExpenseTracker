<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;

class TransactionController extends Controller
{
    /**
     * Display the list of all transactions.
     */
    public function index(): Response
    {
        // Get login user's id.
        $userId = Auth::id();

        // Get all transactions.
        $transactions = Transaction::with('category')
            ->forUser($userId)
            ->orderBy('date')
            ->get();

        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions,
        ]);
    }

    /**
     * Display the transaction creation page
     */
    public function create(): Response
    {
        return Inertia::render('Transactions/Create');
    }

    /**
     * Store the values entered on the transaction create page.
     */
    public function store(Request $request): RedirectResponse
    {
        // Validate and store the input values...
        $validated = $request->validate([
            'date'      => 'required|date_format:Y-m-d',
            'category'  => 'required|exists:categories,id',
            'type'      => 'required|in:expense,income',
            'amount'    => 'required|decimal:2|max_digits:10|min:0',
            'note'      => 'nullable|max:255',
        ]);

        return to_route('transactions.index');
    }
}
