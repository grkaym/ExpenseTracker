<?php

use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('shows the edit page with existing transaction data', function () {
    // Arrange
    $user = User::factory()->create();
    $category = Category::factory()->create(['name' => 'Food', 'type' => 'expense']);
    $transaction = Transaction::factory()->create([
        'user_id' => $user->id,
        'category_id' => $category->id,
        'date' => '2025-01-01',
        'type' => 'expense',
        'amount' => 123.45,
    ]);

    // Act
    $response = $this->actingAs($user)->get(route('transactions.edit', $transaction->id));

    // Assert
    $response->assertStatus(200);
    // Inertia responses return JSON; assertInertia checks component and props
    $response->assertInertia(fn (\Inertia\Testing\AssertableInertia $page) =>
        $page->component('Transactions/Edit')
            ->where('transaction.id', $transaction->id)
            ->where('transaction.date', '2025-01-01')
            ->where('transaction.category.name', 'Food')
    );
});

it('updates the transaction and redirects to index', function () {
    // Arrange
    $user = User::factory()->create();
    $category = Category::factory()->create(['type' => 'expense']);
    $newCategory = Category::factory()->create(['type' => 'expense']);
    $transaction = Transaction::factory()->create([
        'user_id' => $user->id,
        'category_id' => $category->id,
        'date' => '2025-01-01',
        'type' => 'expense',
        'amount' => 100.00,
    ]);

    // Act
    $response = $this->actingAs($user)->patch(route('transactions.update', $transaction->id), [
        'date' => '2025-02-02',
        'category' => (string) $newCategory->id,
        'type' => 'expense',
        'amount' => '456.78',
        'note' => 'Updated note',
    ]);

    // Assert
    $response->assertRedirect(route('transactions.index'));

    $this->assertDatabaseHas('transactions', [
        'id' => $transaction->id,
        'category_id' => $newCategory->id,
        'date' => '2025-02-02',
        'amount' => '456.78',
        'note' => 'Updated note',
    ]);
});
