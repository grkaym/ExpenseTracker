<?php

use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('allows a user to delete their own unused category', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create([
        'user_id' => $user->id,
        'type' => 'expense',
        'name' => 'Temp',
    ]);

    $response = $this->actingAs($user)->delete(route('categories.destroy', $category));

    $response->assertRedirect(route('categories.index'));
    $this->assertDatabaseMissing('categories', ['id' => $category->id]);
});

it('forbids deleting common categories', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create([
        'user_id' => null,
        'type' => 'expense',
        'name' => 'Common',
    ]);

    $response = $this->actingAs($user)->delete(route('categories.destroy', $category));

    $response->assertForbidden();
    $this->assertDatabaseHas('categories', ['id' => $category->id]);
});

it('forbids deleting other users categories', function () {
    $user = User::factory()->create();
    $other = User::factory()->create();
    $category = Category::factory()->create([
        'user_id' => $other->id,
        'type' => 'income',
        'name' => 'OtherUserCat',
    ]);

    $response = $this->actingAs($user)->delete(route('categories.destroy', $category));

    $response->assertForbidden();
    $this->assertDatabaseHas('categories', ['id' => $category->id]);
});

it('prevents deleting categories that are used by transactions', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create([
        'user_id' => $user->id,
        'type' => 'expense',
        'name' => 'UsedCat',
    ]);

    // Create a transaction referencing this category
    Transaction::factory()->create([
        'user_id' => $user->id,
        'category_id' => $category->id,
        'type' => 'expense',
    ]);

    $response = $this->actingAs($user)->delete(route('categories.destroy', $category));

    $response->assertSessionHasErrors('category');
    $this->assertDatabaseHas('categories', ['id' => $category->id]);
});
