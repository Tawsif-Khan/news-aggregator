<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Service\News\DataSources\NewsAPI\NewsApi;
use App\Models\News;
use App\Models\Category;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class FetchNewsApi extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch-news:newsapi';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch news from The NewsApi';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(NewsApi $newsApi)
    {
        $perPage = 100;

        $categories = Category::all();

        foreach ($categories as $category) {

            $this->info("Fetching initialized from The NewsApi by Category {$category->name}");
            $response = $newsApi->searchNews(['category' => $category->name]);

            if ($response['status'] === 'success') {
                $this->processNews($response['data'], $category->name);
                $totalResults = $response['totalResults'];
                $totalPages = ceil($totalResults / $perPage);
                for ($page = 1; $page <= $totalPages; $page++) {
                    $this->info("Fetching data from The NewsApi, page: $page");

                    $response = $newsApi->searchNews(['page' => $page, 'category' => $category->name]);

                    if (isset($response['status']) && $response['status'] == "success") {
                        $this->processNews($response['data'], $category->name);
                    } else {
                        $this->error("Failed to fetch news from The newsApi by Category {$category->name} on page:" . $page);
                        break;
                    }

                    if ($page % 5 === 0) {
                        $this->info("Sleeping for 30 seconds. Due to API rate limit.");
                        sleep(30);
                    }
                }
                $this->info("News fetching completed for Category {$category->name}.");
            } else {
                $this->error("Failed to fetch news from The newsApi");
            }
        }
        $this->info("News fetching completed for all categories.");
    }

    private function processNews($news, $category)
    {
        $timestamp = Carbon::now();
        $newData = array_map(function ($item) use ($timestamp, $category) {

            if (News::where('url', '=', $item['url'])->exists()) {
                return null;
            }

            $item['title'] = isset($item['title']) ? Str::limit($item['title'], 252) : "No Title Provided";
            $item['author'] = isset($item['author']) ? Str::limit($item['author'], 252) : "";
            $item['source'] = isset($item['source']) ? Str::limit($item['source'], 252) : "";
            $item['category'] = $category;
            $item['created_at'] = $timestamp;
            $item['updated_at'] = $timestamp;
            $item['provided_by'] = 'NewsApi';
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
            $this->error("Failed to insert news from The NewsApi");
        }
    }
}
