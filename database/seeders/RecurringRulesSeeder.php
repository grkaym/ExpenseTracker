<?php

namespace Database\Seeders;

use App\Models\RecurringRule;
use Illuminate\Database\Seeder;

class RecurringRulesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RecurringRule::factory()->create(['user_id' => 1]);
    }
}
