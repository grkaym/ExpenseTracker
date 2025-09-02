<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'user_id' => null,
            'name' => 'Food',
            'type' => 'expense',
            'color' => 'red',
        ]);

        Category::create([
            'user_id' => null,
            'name' => 'Salary',
            'type' => 'income',
            'color' => 'green',
        ]);

        Category::create([
            'user_id' => null,
            'name' => 'Transport',
            'type' => 'expense',
            'color' => 'blue',
        ]);

        Category::create([
            'user_id' => 2,
            'name' => 'Tax',
            'type' => 'expense',
            'color' => 'amber',
        ]);
    }
}
