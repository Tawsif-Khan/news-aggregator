<?php

namespace App\Service\News\DataSources\NewsAPI;

use Illuminate\Support\Facades\Http;
use Exception;
use App\Http\Resources\news\NewsApi as DataResource;
use App\Service\News\DataSources\Interface\DataSource;
use Illuminate\Support\Facades\Log;

final class NewsApi implements DataSource
{

    public function __construct(
        private $endpoint = null,
        public $http = null
    ) {
        $this->endpoint = config('news.NEWSAPI_ENDPOINT');
        $this->http = Http::withHeaders([
            'X-Api-Key' => config('news.NEWSAPI_KEY'),
        ]);
    }

    //Search
    public function searchNews(array $data): array
    {
        $payload = [
            "q" => $data["category"] ?? "News",
            "sortBy" => "publishedAt",
            "pageSize" => 50,
            "page" => $data['page'] ?? '',
        ];
        $payload = urldecode(http_build_query(array_filter($payload)));
        try {
            $response = $this->http->get($this->endpoint . '/everything?' . $payload);
            if (isset($response->json()['totalResults']) && $response->json()['articles']) {
                return [
                    'status' => 'success',
                    'totalResults' => $response->json()['totalResults'],
                    'data' => DataResource::collection($response->json()['articles'])->resolve()
                ];
            } else {
                Log::error("NewsApi: " . $response->json()['message']);
                return [
                    'status' => 'false',
                    'message' => isset($response->json()['message']) ? $response->json()['message'] : "API Error"
                ];
            }
        } catch (Exception $e) {
            Log::error("NewsApi: " . $e->getMessage());
            return [
                'status' => 'false',
                'message' => 'API Error'
            ];
        }
    }

    //Sources
    public function sources()
    {
        try {
            $response = $this->http->get($this->endpoint . '/sources');
            return $response->json()['sources'] ? $response->json()['sources'] : [];
        } catch (Exception $e) {
            Log::error("NewsApi: " . $e->getMessage());
        }
    }
}
