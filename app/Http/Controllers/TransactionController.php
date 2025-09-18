<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use App\Http\Requests\StoreTransactionRequest;

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
        // Get login user's id.
        $userId = Auth::id();

        // Get categories for the login user.
        $categories = Category::forUser($userId)->get();

        return Inertia::render('Transactions/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store the values entered on the transaction create page.
     */
    public function store(StoreTransactionRequest $request): RedirectResponse
    {
        // Retrieve the validated input data
        $data = $request->validated();

        // Store the transaction
        $t = new Transaction;
        $t->user_id = Auth::id();
        $t->date = $data['date'];
        $t->category_id = $data['category'];
        $t->type = $data['type'];
        $t->amount = $data['amount'];
        $t->note = $data['note'];
        $t->save();

        // Redirect to transaction list page
        return to_route('transactions.index');
    }
}
