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

        // Get categories for the login user
        $categories = Category::forUser($userId)
            ->orderBy('type')
            ->get();

        $filters = [
            'from' => $request->query('from') ?? Carbon::now()->subYear()->format('Y-m-d'),
            'to' => $request->query('to') ?? Carbon::now()->format('Y-m-d'),
            'category' => $request->query('category') ?? 'all',
            'type' => $request->query('type') ?? 'both',
            'sort' => $request->query('sort') ?? 'newest',
        ];

        // Get filtered transactions
        $transactions = Transaction::with('category')
            ->forUser($userId)
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
