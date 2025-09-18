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
        // Get filters
        $fFrom = $request->query('from');
        $fTo = $request->query('to');
        $fCat = $request->query('category');
        $fType = $request->query('type');
        $fSort = $request->query('sort');

        // Get categories for the login user
        $categories = Category::forUser($userId)
            ->orderBy('type')
            ->get();

        $filters = [
            'from' => $fFrom ?? Carbon::now()->subYear(),
            'to' => $fTo ?? Carbon::now(),
            'category' => $fCat ?? 'all',
            'type' => $fType ?? 'both',
            'sort' => $fSort ?? 'newest',
        ];

        // Get filtered transactions
        $transactions = Transaction::with('category')
            ->forUser($userId)
            ->when(($filters['from'] !== ''), function (Builder $q) use ($filters) {
                $q->where('date', '>=', $filters['from']);
            })
            ->when($filters['to'] !== '', function (Builder $q) use ($filters) {
                $q->where('date', '<=', $filters['to']);
            })
            ->when(($filters['category'] !== 'all'), function (Builder $q) use ($fCat) {
                // Filter category
                // Remove this condition if category is filtered
                $q->where('category_id', $fCat);
            })
            ->when(($filters['type'] !== 'both'), function (Builder $q) use ($fType) {
                // Filter type
                // Remove this condition if type is filtered
                $q->where('type', $fType);
            })
            ->when(($filters['sort'] === 'newest'), function (Builder $q) {
                // sort (newest)
                $q->orderBy('date', 'desc');
            }, function (Builder $q) {
                // sort (oldest)
                $q->orderBy('date', 'asc');
            })
            ->orderBy('created_at', 'desc')
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
