<?php

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('displays the categories index page', function () {
    // Arrange
    $user = User::factory()->create();

    // Act
    $response = $this->actingAs($user)->get(route('categories.index'));

    // Assert
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('Categories/Index'));
});

it('displays user-specific categories', function () {
    // Arrange
    $user = User::factory()->create();
    $expenseCategory = Category::factory()->create([
        'user_id' => $user->id,
        'name' => 'Food',
        'type' => 'expense',
        'color' => '#FF5733',
    ]);
    $incomeCategory = Category::factory()->create([
        'user_id' => $user->id,
        'name' => 'Salary',
        'type' => 'income',
        'color' => '#33FF57',
    ]);

    // Act
    $response = $this->actingAs($user)->get(route('categories.index'));

    // Assert
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Categories/Index')
        ->has('categories', 2)
        ->where('categories.0.name', 'Food')
        ->where('categories.0.type', 'expense')
        ->where('categories.1.name', 'Salary')
        ->where('categories.1.type', 'income')
    );
});

it('displays common categories (null user_id) along with user categories', function () {
    // Arrange
    $user = User::factory()->create();
    $commonCategory = Category::factory()->create([
        'user_id' => null,
        'name' => 'General',
        'type' => 'expense',
    ]);
    $userCategory = Category::factory()->create([
        'user_id' => $user->id,
        'name' => 'Custom',
        'type' => 'expense',
    ]);

    // Act
    $response = $this->actingAs($user)->get(route('categories.index'));

    // Assert
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Categories/Index')
        ->has('categories', 2)
        ->where('categories.0.name', 'Custom')
        ->where('categories.1.name', 'General')
    );
});

it('does not display other users categories', function () {
    // Arrange
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $userCategory = Category::factory()->create([
        'user_id' => $user->id,
        'name' => 'My Category',
        'type' => 'expense',
    ]);
    $otherCategory = Category::factory()->create([
        'user_id' => $otherUser->id,
        'name' => 'Other Category',
        'type' => 'expense',
    ]);

    // Act
    $response = $this->actingAs($user)->get(route('categories.index'));

    // Assert
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Categories/Index')
        ->has('categories', 1)
        ->where('categories.0.name', 'My Category')
    );
});

it('sorts categories by type and name', function () {
    // Arrange
    $user = User::factory()->create();
    Category::factory()->create([
        'user_id' => $user->id,
        'name' => 'Salary',
        'type' => 'income',
    ]);
    Category::factory()->create([
        'user_id' => $user->id,
        'name' => 'Food',
        'type' => 'expense',
    ]);
    Category::factory()->create([
        'user_id' => $user->id,
        'name' => 'Transportation',
        'type' => 'expense',
    ]);

    // Act
    $response = $this->actingAs($user)->get(route('categories.index'));

    // Assert
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Categories/Index')
        ->has('categories', 3)
        // Expense categories should come first (alphabetically 'expense' < 'income')
        ->where('categories.0.name', 'Food')
        ->where('categories.0.type', 'expense')
        ->where('categories.1.name', 'Transportation')
        ->where('categories.1.type', 'expense')
        ->where('categories.2.name', 'Salary')
        ->where('categories.2.type', 'income')
    );
});

it('redirects to login when unauthenticated', function () {
    // Act
    $response = $this->get(route('categories.index'));

    // Assert
    $response->assertRedirect(route('login'));
});
