<?php

namespace Tests;

use Database\Seeders\CategoriesSeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    /**
     * Indicates whether the default seeder should run before each test.
     *
     * @var bool
     */
    protected $seed = [
        UserSeeder::class,
        CategoriesSeeder::class,
    ];
}
