<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;

// Reset the database after each of tests.
pest()->use(RefreshDatabase::class);

test('it stores a transaction in the databse', function () {
    // test user
    $user = User::find(1);

    $response = $this->actingAs($user)
        ->post(route('transactions.store'), [
            'user_id' => Auth::id(),
            'date' => '2025-09-01',
            'category' => '1',
            'type' => 'expense',
            'amount' => '100.00',
            'note' => 'This is a test transaction.',
        ]);

    // No validation errors
    $response->assertValid();
    // Redirect after post
    $response->assertRedirect();
    // The data is stored into database
    $this->assertDatabaseHas('transactions', [
        'user_id' => Auth::id(),
        'date' => '2025-09-01',
        'category_id' => '1',
        'type' => 'expense',
        'amount' => '100.00',
        'note' => 'This is a test transaction.',
    ]);
});

test('they are invalid dates', function ($date) {
    // test user
    $user = User::find(1);

    $response = $this->actingAs($user)
        ->post(route('transactions.store'), [
            'user_id' => Auth::id(),
            'date' => $date,
            'category' => '1',
            'type' => 'expense',
            'amount' => '100.00',
            'note' => 'This is a test transaction.',
        ]);

    // date field has validation errors
    $response->assertInvalid(['date']);
})->with([
    ['2025/09/01'],     // slash
    ['09-01-2025'],     // order
    ['2025-13-01'],     // invalid month
    ['2025-09-31'],     // invalid day
    [''],               // empty
    [null],             // null
]);

test('they are invalid types', function ($type) {
    // test user
    $user = User::find(1);

    $response = $this->actingAs($user)
        ->post(route('transactions.store'), [
            'user_id' => Auth::id(),
            'date' => '2025-09-01',
            'category' => '1',
            'type' => $type,
            'amount' => '100.00',
            'note' => 'This is a test transaction.',
        ]);

    // type field has validation errors
    $response->assertInvalid(['type']);
})->with([
    ['refund'],     // other than 'expense' and 'income'
    ['EXPENSE'],    // capital letters
    ['12345'],      // numbers
    [''],           // empty
    [null],         // null
]);

test('they are invalid amounts', function ($amount) {
    // test user
    $user = User::find(1);

    $response = $this->actingAs($user)
        ->post(route('transactions.store'), [
            'user_id' => Auth::id(),
            'date' => '2025-09-01',
            'category' => '1',
            'type' => 'expense',
            'amount' => $amount,
            'note' => 'This is a test transaction.',
        ]);

    // amount field has validation errors
    $response->assertInvalid(['amount']);
})->with([
    ['abcde'],          // letters
    ['100,00'],         // comma
    ['-1'],             // negative number
    ['-0.01'],          // negative decimal
    ['0.001'],          // decimal 3 digits
    ['1.2345'],         // decimal 4 digits
    ['0.000'],          // decimal 4 digits(zero padding)
    ['99999999999.99'], // digits exceeded(decimal)
    ['1234567890123'],  // digits exceeded(integer)
    ['--10'],           // invalid symbol
    ['10..5'],          // 2 decimal points
    [''],               // empty
    [null],             // null
]);
