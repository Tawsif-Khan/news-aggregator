<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Service\News\DataSources\NewsAPI\NewsApi;
use App\Models\Source;

class SourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sources = (new NewsApi)->sources();
        if (is_countable($sources) && count($sources) > 0) {
            $data = array_map(function ($row) {
                return [
                    "name" => $row["name"]
                ];
            }, $sources);
        } else {
            $data = [
                'name' => 'The New York Times',
                'name' => 'The Guardian',
                'name' => 'BBC News',
                'name' => 'CNN',
                'name' => 'The Washington Post',
                'name' => 'The Wall Street Journal',
                'name' => 'The Independent',
                'name' => 'The Times',
                'name' => 'The Telegraph',
                'name' => 'The Economic Times'
            ];
        }

        Source::insert($data);
    }
}
