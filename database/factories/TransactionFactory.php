<?php

namespace Database\Factories;

use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $dt = fake()->dateTimeBetween('-4 month', 'now');
        $dateStr = Carbon::instance($dt)->format('Y-m-d');

        return [
            'date' => $dateStr,
            'category_id' => Category::factory(),
            'type' => fake()->randomElement(['expense', 'income']),
            'amount' => fake()->numberBetween(100, 1000),
        ];
    }

    /**
     * Generate a transaction belongs to the type of 'expense'.
     */
    public function expense()
    {
        return $this->state(fn () => ['type' => 'expense']);
    }

    /**
     * Generate a transaction belongs to the type of 'income'.
     */
    public function income()
    {
        return $this->state(fn () => ['type' => 'income']);
    }
}
