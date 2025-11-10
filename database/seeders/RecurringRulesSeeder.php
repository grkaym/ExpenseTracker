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
        $userId = 1;

        // Prefer reusing an existing expense category for the user so we don't
        // accidentally create a duplicate common category (e.g. 'Food') via
        // Category::factory() used by the RecurringRule factory.
        $category = \App\Models\Category::type('expense')->forUser($userId)->inRandomOrder()->first();

        if (! $category) {
            // Fallback: create one if none exist (shouldn't happen with CategoriesSeeder)
            $category = \App\Models\Category::factory()->expense()->create();
        }

        RecurringRule::factory()->create([
            'user_id' => $userId,
            'category_id' => $category->id,
        ]);
    }
}
