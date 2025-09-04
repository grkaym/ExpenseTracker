<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Database\Seeder;

class TransactionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userId = 1;

        // transactions type of 'expense'
        $expenseCats = Category::type('expense')->forUser($userId)->get();
        Transaction::factory()
            ->expense()
            ->recycle($expenseCats)
            ->count(15)
            ->create(['user_id' => $userId]);

        // transactions type of 'income'
        $incomeCats = Category::type('income')->forUser($userId)->get();
        Transaction::factory()
            ->income()
            ->recycle($incomeCats)
            ->count(15)
            ->create(['user_id' => $userId]);
    }
}
