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
        // categories type of 'expense'
        Category::factory()->expense()->count(9)->create();
        // categories type of 'income'
        Category::factory()->income()->count(8)->create();
    }
}
