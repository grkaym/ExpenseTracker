<?php

namespace App\Http\Controllers;

use App\Models\Category;
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
}
