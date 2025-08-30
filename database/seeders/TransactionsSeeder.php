<?php

namespace Database\Seeders;

use App\Models\Transaction;
use Illuminate\Database\Seeder;

class TransactionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Transaction::create(['user_id' => 1, 'category_id' => 1, 'date' => '2025/10/01', 'type' => 'expense', 'amount' => 10.25]);
        Transaction::create(['user_id' => 1, 'category_id' => 1, 'date' => '2025/07/03', 'type' => 'expense', 'amount' => 5.40]);
        Transaction::create(['user_id' => 1, 'category_id' => 1, 'date' => '2025/07/05', 'type' => 'income',  'amount' => 12.00]);
        Transaction::create(['user_id' => 1, 'category_id' => 1, 'date' => '2025/07/08', 'type' => 'expense', 'amount' => 7.30]);
        Transaction::create(['user_id' => 1, 'category_id' => 1, 'date' => '2025/07/10', 'type' => 'expense', 'amount' => 3.75]);
        Transaction::create(['user_id' => 1, 'category_id' => 1, 'date' => '2025/08/12', 'type' => 'income',  'amount' => 20.00]);
        Transaction::create(['user_id' => 1, 'category_id' => 1, 'date' => '2025/07/15', 'type' => 'expense', 'amount' => 15.80]);
        Transaction::create(['user_id' => 1, 'category_id' => 1, 'date' => '2025/07/18', 'type' => 'expense', 'amount' => 4.20]);
        Transaction::create(['user_id' => 1, 'category_id' => 1, 'date' => '2025/07/20', 'type' => 'expense', 'amount' => 8.60]);
        Transaction::create(['user_id' => 1, 'category_id' => 1, 'date' => '2025/07/22', 'type' => 'expense', 'amount' => 6.45]);
        Transaction::create(['user_id' => 1, 'category_id' => 1, 'date' => '2025/07/25', 'type' => 'income',  'amount' => 30.00]);
        Transaction::create(['user_id' => 1, 'category_id' => 1, 'date' => '2025/07/27', 'type' => 'expense', 'amount' => 11.90]);
        Transaction::create(['user_id' => 1, 'category_id' => 1, 'date' => '2025/07/29', 'type' => 'expense', 'amount' => 9.15]);
        Transaction::create(['user_id' => 1, 'category_id' => 1, 'date' => '2025/09/30', 'type' => 'expense', 'amount' => 2.50]);
    }
}
