<?php

use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('deletes a transaction and redirects to index', function () {
    // Arrange
    $user = User::factory()->create();
    $category = Category::factory()->create();
    $transaction = Transaction::factory()->create([
        'user_id' => $user->id,
        'category_id' => $category->id,
    ]);

    // Act
    $response = $this->actingAs($user)->delete(route('transactions.destroy', $transaction->id));

    // Assert
    $response->assertRedirect(route('transactions.index'));
    $this->assertDatabaseMissing('transactions', ['id' => $transaction->id]);
});

it('forbids deleting a transaction owned by another user', function () {
    // Arrange
    $owner = User::factory()->create();
    $other = User::factory()->create();
    $category = Category::factory()->create();
    $transaction = Transaction::factory()->create([
        'user_id' => $owner->id,
        'category_id' => $category->id,
    ]);

    // Act
    $response = $this->actingAs($other)->delete(route('transactions.destroy', $transaction->id));

    // Assert
    $response->assertForbidden();
    $this->assertDatabaseHas('transactions', ['id' => $transaction->id]);
});
