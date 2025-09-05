<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DemoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Demo login
Route::controller(DemoController::class)
    ->prefix('demo')
    ->name('demo.')
    ->group(function() {
        Route::get('/login', 'login')->name('login');
        Route::get('/logout', 'logout')->name('logout');
    });

// Auth
Route::middleware('auth')->group(function () {
    // dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    // transactions
    Route::controller(TransactionController::class)
        ->prefix('transactions')
        ->name('transactions.')
        ->group(function () {
            Route::get('/index', 'index')->name('index');
            Route::get('/create', 'create')->name('create');
            Route::post('/store', 'store')->name('store');
        });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
