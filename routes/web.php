<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DemoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecurringRuleController;
use App\Http\Controllers\TransactionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
    return Inertia::render('Landing');
});

// Demo login
// Demo routes are lightweight (GET only) and rate-limited by throttle middleware.
// These routes handle demo login/logout/register flows safely without affecting real users.
Route::controller(DemoController::class)
    ->prefix('demo')
    ->name('demo.')
    ->group(function () {
        Route::get('/login', 'login')->name('login');
        Route::get('/logout', 'logout')->name('logout');
        Route::get('/register', 'exitDemoAndRegister')->name('register');
    })->middleware('throttle:20,1');

// Auth
Route::middleware('auth')->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    // Transactions
    Route::controller(TransactionController::class)
        ->prefix('transactions')
        ->name('transactions.')
        ->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/create', 'create')->name('create');
            Route::get('/{transaction}/edit', 'edit')->name('edit');
            Route::patch('/{transaction}', 'update')->name('update');
            Route::delete('/{transaction}', 'destroy')->name('destroy');
            Route::post('/store', 'store')->name('store');
        });
    // Recurring Rule
    Route::controller(RecurringRuleController::class)
        ->prefix('recurring')
        ->name('recurring.')
        ->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/create', 'create')->name('create');
            Route::post('/store', 'store')->name('store');
        });
    // Categories
    Route::controller(CategoryController::class)
        ->prefix('categories')
        ->name('categories.')
        ->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'store')->name('store');
            Route::delete('/{category}', 'destroy')->name('destroy');
        });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
