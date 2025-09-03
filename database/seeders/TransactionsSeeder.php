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
        $expenseCats = Category::where('type', 'expense')
            ->where(function ($q) use ($userId) {
                $q->whereNull('user_id')
                    ->orWhere('user_id', $userId);
            })
            ->get();
        Transaction::factory()
            ->expense()
            ->recycle($expenseCats)
            ->count(15)
            ->create(['user_id' => $userId]);

        // transactions type of 'income'
        $incomeCats = Category::where('type', 'income')
            ->where(function ($q) use ($userId) {
                $q->whereNull('user_id')
                    ->orWhere('user_id', $userId);
            })
            ->get();
        Transaction::factory()
            ->income()
            ->recycle($incomeCats)
            ->count(15)
            ->create(['user_id' => $userId]);
    }
}
