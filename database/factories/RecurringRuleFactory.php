<?php

namespace Database\Factories;

use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RecurringRule>
 */
class RecurringRuleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // random date for this recurring registration
        $dt = fake()->dateTimeBetween('-5 month', '-2 month');
        $startDateStr = Carbon::instance($dt)->format('Y-m-d');
        // end date for this recurring registration
        $endDateStr = Carbon::instance($dt)->copy()->addMonths(3)->format('Y-m-d');
        // next run date
        $tomorrow = Carbon::now()->addDay()->format('Y-m-d');
        // last run date
        $yesterday = Carbon::now()->subDay()->format('Y-m-d');

        return [
            // Transaction data
            'category_id' => Category::factory(),
            'type' => 'expense',
            'amount' => fake()->numberBetween(100, 10000),
            'note' => 'demo recurring transaction',

            // Recurring settings
            'start_date' => $startDateStr,
            'frequency' => fake()->randomElement(['daily', 'weekly', 'monthly']),
            'timezone' => 'UTC',
            'status' => 'active',

            // Internal data
            'next_run_date' => $tomorrow,
            'last_generated_at' => $yesterday,
        ];
    }
}
