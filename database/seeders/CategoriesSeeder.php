<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'user_id' => 1,
            'name' => 'Food',
            'type' => 'expense',
            'color' => 'red',
        ]);

        Category::create([
            'user_id' => 1,
            'name' => 'Salary',
            'type' => 'income',
            'color' => 'green',
        ]);

        Category::create([
            'user_id' => 1,
            'name' => 'Transport',
            'type' => 'expense',
            'color' => 'blue',
        ]);
    }
}
