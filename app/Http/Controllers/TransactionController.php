<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionRequest;
use App\Models\Category;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    /**
     * Display the list of all transactions.
     */
    public function index(Request $request): Response
    {
        // Get login user's id
        $userId = Auth::id();

        // Categories available for this user (ordered by type)
        $categories = Category::forUser($userId)
            ->orderBy('type')
            ->get();

        // Current date used as baseline for filters
        $today = Carbon::now();

        // Build filter from query parameters (with sensible defaults)
        $filters = [
            // Default: one year ago if no "from" date provided
            'from' => $request->query('from') ?? $today->copy()->subYear()->format('Y-m-d'),
            // Default: today if no "to" date provided
            'to' => $request->query('to') ?? $today->format('Y-m-d'),
            // Default: all categories
            'category' => $request->query('category') ?? 'all',
            // Default: both income and expense
            'type' => $request->query('type') ?? 'both',
            // Default: newest transactions first
            'sort' => $request->query('sort') ?? 'newest',
        ];

        // Get filtered transactions
        $transactions = Transaction::with('category')
            ->forUser($userId)
            // Filter only transactions that meet the conditions
            ->filter($filters)
            ->get();

        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions,
            'categories' => $categories,
            'filters' => $filters,
        ]);
    }

    /**
     * Display the transaction creation page
     */
    public function create(): Response
    {
        // Get categories for the login user.
        $categories = Category::forUser(Auth::id())->get();

        return Inertia::render('Transactions/Create', [
            'categories' => $categories,
        ]);
    }

        /**
         * Display the transaction edit page
         */
        public function edit(Transaction $transaction): Response
        {
            // Ensure the transaction belongs to the authenticated user
            $transaction = Transaction::with('category')
                ->forUser(Auth::id())
                ->where('id', $transaction->id)
                ->firstOrFail();

            $categories = Category::forUser(Auth::id())->get();

            return Inertia::render('Transactions/Edit', [
                'transaction' => $transaction,
                'categories' => $categories,
            ]);
        }

        /**
         * Update the specified transaction
         */
        public function update(StoreTransactionRequest $request, Transaction $transaction)
        {
            // Ensure the transaction belongs to the authenticated user
            $tx = Transaction::forUser(Auth::id())->where('id', $transaction->id)->firstOrFail();

            $tx->update([
                'date' => $request->validated()['date'],
                'category_id' => $request->validated()['category'],
                'type' => $request->validated()['type'],
                'amount' => $request->validated()['amount'],
                'note' => $request->validated()['note'] ?? null,
                'recurring_id' => $request->validated()['recurring_id'] ?? null,
            ]);

            return to_route('transactions.index');
        }

    /**
     * Store the values entered on the transaction create page.
     */
    public function store(StoreTransactionRequest $request): RedirectResponse
    {
        // Validate request and store the transaction
        Transaction::createForUser(Auth::id(), $request->validated());

        // Redirect to transaction list page
        return to_route('transactions.index');
    }
}
