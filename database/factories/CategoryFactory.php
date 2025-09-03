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
        // Generate categories randomly
        return [
            'user_id' => null,
            'type'    => 'expense',
            'name'    => 'Food',
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

        return $this->state(fn() => [
            'user_id' => null,  // common category
            'type' => 'expense',
            'name' => fake()->unique()->randomElement($names),
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

        return $this->state(fn() => [
            'user_id' => null,  // common category
            'type' => 'income',
            'name' => fake()->unique()->randomElement($names),
        ]);
    }
}
