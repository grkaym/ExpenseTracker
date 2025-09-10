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

class TransactionController extends Controller
{
    /**
     * Display the list of all transactions.
     */
    public function index(Request $request): Response
    {
        // Get login user's id
        $userId = Auth::id();
        // Get filters
        $fCat = $request->query('category');
        $fType = $request->query('type');
        $fSort = $request->query('sort');

        // Get categories for the login user
        $categories = Category::forUser($userId)
            ->orderBy('type')
            ->get();

        $filters = [
            'category' => $fCat ?? 'all',
            'type' => $fType ?? 'both',
            'sort' => $fSort ?? 'newest',
        ];

        // Get filtered transactions
        $transactions = Transaction::with('category')
            ->forUser($userId)
            ->when($fCat && ($fCat !== 'all'), function (Builder $q) use ($fCat) {
                // Filter category
                $q->where('category_id', $fCat);
            })
            ->when($fType && ($fType !== 'both'), function (Builder $q) use ($fType) {
                // Filter type
                $q->where('type', $fType);
            })
            ->when($fSort && ($fSort === 'newest'), function (Builder $q) {
                // sort (newest)
                $q->orderBy('date', 'desc');
            }, function (Builder $q) {
                // sort (oldest)
                $q->orderBy('date', 'asc');
            })
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
        $categories = Category::forUser($userId)
            ->orderBy('type')
            ->get();

        return Inertia::render('Transactions/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store the values entered on the transaction create page.
     */
    public function store(Request $request): RedirectResponse
    {
        // Validate and store the input values...
        $validated = $request->validate([
            'date' => 'required|date_format:Y-m-d',
            'category' => 'required|exists:categories,id',
            'type' => 'required|in:expense,income',
            'amount' => 'required|decimal:2|min:0|max:9999999999.99',
            'note' => 'nullable|max:255',
        ]);

        // Insert values into Transaction Model.
        $t = new Transaction;
        $t->user_id = Auth::id();
        $t->date = $request->date;
        $t->category_id = $request->category;
        $t->type = $request->type;
        $t->amount = $request->amount;
        $t->note = $request->note;
        $t->save();

        // Redirect to transaction list page.
        return to_route('transactions.index');
    }
}
