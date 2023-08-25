<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            ['name' => 'Sports'],
            ['name' => 'Technology'],
            ['name' => 'Entertainment'],
            ['name' => 'Politics'],
            ['name' => 'Government'],
            ['name' => 'Business'],
            ['name' => 'Health'],
            ['name' => 'Science'],
            ['name' => 'Travel'],
            ['name' => 'Food'],
            ['name' => 'Lifestyle'],
            ['name' => 'War'],
            ['name' => 'Education'],
            ['name' => 'Environment'],
            ['name' => 'Fashion'],
            ['name' => 'Music'],
            ['name' => 'Art'],
            ['name' => 'Film'],
            ['name' => 'Books'],
            ['name' => 'Gaming'],
            ['name' => 'Weather'],
            ['name' => 'Culture'],
            ['name' => 'Opinion'],
            ['name' => 'Crime'],
            ['name' => 'Religion'],
            ['name' => 'Automotive'],
            ['name' => 'Aviation'],
            ['name' => 'Space'],
            ['name' => 'Military'],
            ['name' => 'History'],
        ];

        Category::insert($categories);
    }
}
