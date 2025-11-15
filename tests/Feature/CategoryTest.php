<?php

use App\Models\Category;
use App\Models\User;

test('authenticated user can view categories index', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/categories');

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page->component('Categories/Index'));
});

test('authenticated user can create a new category', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/categories', [
        'name' => 'Test Category',
        'type' => 'expense',
    ]);

    $response->assertRedirect(route('categories.index'));

    $this->assertDatabaseHas('categories', [
        'name' => 'Test Category',
        'type' => 'expense',
        'user_id' => $user->id,
    ]);

    // Check that color was generated
    $category = Category::where('name', 'Test Category')->first();
    expect($category->color)->not->toBeNull();
    expect($category->color)->toMatch('/^#[0-9A-F]{6}$/');
});

test('category creation requires name', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/categories', [
        'type' => 'expense',
    ]);

    $response->assertSessionHasErrors('name');
});

test('category creation requires type', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/categories', [
        'name' => 'Test Category',
    ]);

    $response->assertSessionHasErrors('type');
});

test('category type must be either expense or income', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/categories', [
        'name' => 'Test Category',
        'type' => 'invalid',
    ]);

    $response->assertSessionHasErrors('type');
});

test('guest cannot create category', function () {
    $response = $this->post('/categories', [
        'name' => 'Test Category',
        'type' => 'expense',
    ]);

    $response->assertRedirect(route('login'));
});
