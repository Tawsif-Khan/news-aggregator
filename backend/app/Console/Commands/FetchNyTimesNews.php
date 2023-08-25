<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Service\News\DataSources\NyTimes\NyTimes;
use App\Models\News;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use App\Models\Category;

class FetchNyTimesNews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch-news:nytimes';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch news from The New York Times';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(NyTimes $nyTimes)
    {
        $perPage = 100;
        $categories = Category::all();

        foreach ($categories as $category) {
            $this->info("Fetching initialized from The New York Times by Category: {$category->name}");
            $response = $nyTimes->searchNews(['category' => $category->name]);

            if ($response['status'] === 'success') {
                $this->processNews($response['data']);
                $totalResults = $response['totalResults'];
                $totalPages = ceil($totalResults / $perPage);
                for ($page = 1; $page <= $totalPages; $page++) {
                    $this->info("Fetching data from The New York Times by Category {$category->name}, page: $page");

                    $response = $nyTimes->searchNews(['page' => $page, 'category' => $category->name]);

                    if (isset($response['status']) && $response['status'] == "success") {
                        $this->processNews($response['data']);
                    } else {
                        $this->error("Failed to fetch news from The New York Times on page:" . $page);
                        break;
                    }

                    if ($page % 5 === 0) {
                        $this->info("Sleeping for 30 seconds. Due to API rate limit.");
                        sleep(30);
                    }
                }
                $this->info("News fetching completed by Category {$category->name}.");
            } else {
                $this->error("Failed to fetch news from The New York Times");
            }
        }
        $this->info("News fetching completed for all categories.");
    }

    private function processNews($news)
    {
        $timestamp = Carbon::now();
        $newData = array_map(function ($item) use ($timestamp) {

            if (News::where('url', '=', $item['url'])->exists()) {
                return null;
            }

            $item['title'] = isset($item['title']) ? Str::limit($item['title'], 252) : "No Title Provided";
            $item['author'] = isset($item['author']) ? Str::limit($item['author'], 252) : "";
            $item['source'] = isset($item['source']) ? Str::limit($item['source'], 252) : "";
            $item['image_url'] = isset($item['image_url']) ? "https://www.nytimes.com/" . $item['image_url'] : "";
            $item['created_at'] = $timestamp;
            $item['updated_at'] = $timestamp;
            $item['provided_by'] = 'NyTimes';
            return $item;
        }, $news);
        $newData = array_filter($newData);
        if (empty($newData)) {
            $this->info("No new news found.");
            return;
        }
        try {
            News::insert($newData);
        } catch (\Exception $e) {
            Log::error("fetch-news:newsapi : " . $e->getMessage());
            $this->error("Failed to insert news from The NyTimes");
        }
    }
}
