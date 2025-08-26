<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Transaction;

class TransactionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Transaction::create([
            'user_id' => 1,
            'category_id' => 1,
            'date' => '2025/07/01',
            'type' => 'expense',
            'amount' => 10.25,
        ]);

        Transaction::create([
            'user_id' => 1,
            'category_id' => 1,
            'date' => '2025/07/20',
            'type' => 'expense',
            'amount' => 8.6,
        ]);

        Transaction::create([
            'user_id' => 1,
            'category_id' => 1,
            'date' => '2025/10/11',
            'type' => 'income',
            'amount' => 4,
        ]);
    }
}
