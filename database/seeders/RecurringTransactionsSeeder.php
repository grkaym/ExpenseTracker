<?php

namespace Database\Seeders;

use App\Models\RecurringTransaction;
use Illuminate\Database\Seeder;

class RecurringTransactionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RecurringTransaction::factory()->create(['user_id' => 1]);
    }
}
