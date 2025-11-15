<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Default: produce a random category so using the factory without a state
        // won't always create a fixed "Food" record (which caused duplicates).
        return [
            'user_id' => null,
            'type' => fake()->randomElement(['expense', 'income']),
            'name' => fake()->unique()->word(),
            'color' => sprintf('#%06X', mt_rand(0, 0xFFFFFF)),
        ];
    }

    /**
     * Generate categories belongs to the type of 'expense'.
     */
    public function expense()
    {
        $names = [
            'Food', 'Transport', 'Utilities', 'Entertainment',
            'Shopping', 'Health', 'Education', 'Travel', 'Others',
        ];

        return $this->state(fn () => [
            'user_id' => null,  // common category
            'type' => 'expense',
            'name' => fake()->unique()->randomElement($names),
            'color' => sprintf('#%06X', mt_rand(0, 0xFFFFFF)),
        ]);
    }

    /**
     * Generate categories belongs to the type of 'income'.
     */
    public function income()
    {
        $names = [
            'Salary', 'Bonus', 'Interest', 'Dividends',
            'Gifts', 'Side Job', 'Refund', 'Other Income',
        ];

        return $this->state(fn () => [
            'user_id' => null,  // common category
            'type' => 'income',
            'name' => fake()->unique()->randomElement($names),
            'color' => sprintf('#%06X', mt_rand(0, 0xFFFFFF)),
        ]);
    }
}
