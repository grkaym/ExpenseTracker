<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRecurringRuleRequest;
use App\Models\Category;
use App\Models\RecurringTransaction;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RecurringRuleController extends Controller
{
    public function index(): Response
    {
        // Get login user's id
        $userId = Auth::id();

        // Get recurring transaction rules for the login user with categories
        $recurringRules = RecurringTransaction::with('category')
            ->forUser($userId)
            ->orderBy('status', 'asc')
            ->get();

        return Inertia::render('Recurring/Index', [
            'recurringRules' => $recurringRules,

        ]);
    }

    public function create(): Response
    {
        // Get login user's id
        $userId = Auth::id();

        // Get category List
        $categories = Category::forUser($userId)
            ->get();

        return Inertia::render('Recurring/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(StoreRecurringRuleRequest $request): RedirectResponse
    {
        // Retrieve the validated input data
        $data = $request->validated();

        // Calculate next run date
        $nextRunDate = Carbon::parse($data['startDate']);
        $frequency = $data['frequency'];
        switch ($frequency) {
            case 'daily': $nextRunDate->addDay();
                break;
            case 'weekly': $nextRunDate->addWeek();
                break;
            case 'monthly': $nextRunDate->addMonth();
                break;
            default: $nextRunDate;
        }

        // Store the recurring rule
        $r = new RecurringTransaction;
        $r->user_id = Auth::id();
        $r->category_id = $data['category'];
        $r->type = $data['type'];
        $r->amount = $data['amount'];
        $r->note = $data['note'];
        $r->start_date = $data['startDate'];
        $r->frequency = $frequency;
        $r->next_run_date = $nextRunDate;
        $r->save();

        return to_route('recurring.index');
    }
}
