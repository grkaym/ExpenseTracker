<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display the list of all categories.
     */
    public function index(): Response
    {
        // Get login user's id
        $userId = Auth::id();

        // Get categories for the login user
        $categories = Category::forUser($userId)
            ->orderBy('type')
            ->orderBy('name')
            ->get();

        return Inertia::render('Categories/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created category.
     */
    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        // Generate random color for the category
        $validated['color'] = sprintf('#%06X', mt_rand(0, 0xFFFFFF));
        $validated['user_id'] = Auth::id();

        Category::create($validated);

        return redirect()->route('categories.index');
    }
}
