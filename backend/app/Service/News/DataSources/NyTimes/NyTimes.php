<?php

namespace App\Service\News\DataSources\NyTimes;

use Illuminate\Support\Facades\Http;
use Exception;
use App\Http\Resources\news\NyTimes as NyTimesResource;
use App\Service\News\DataSources\Interface\DataSource;
use Illuminate\Support\Facades\Log;

final class NyTimes implements DataSource
{
    public function __construct(
        private $endpoint = null,
        private $api_key = null
    ) {
        $this->endpoint = config('news.NEWWORKTIMES_ENDPOINT');
        $this->api_key = config('news.NEWWORKTIMES_KEY');
    }

    //Search
    public function searchNews(array $data): array
    {
        $payload = [
            'api-key' => $this->api_key,
            'sort' => 'newest',
            'page' => $data['page'] ?? '',
            'fq' => isset($data['category']) ? 'news_desk:(' . '"' . $data['category'] . '"' . ')' : '',
        ];
        $payload = urldecode(http_build_query(array_filter($payload)));
        try {
            $response = Http::get($this->endpoint . '/articlesearch.json?' . $payload);
            if (isset($response->json()['response'])) {
                return [
                    'status' => 'success',
                    'totalResults' => $response->json()['response']['meta']['hits'],
                    'data' => NyTimesResource::collection($response->json()['response']['docs'])->resolve()
                ];
            } else {
                $msg = isset($response->json()['response']['message']) ? $response->json()['response']['message'] : "API Unknown response";
                Log::error("NyTimes: " . $msg);
                return [
                    'status' => 'false',
                    'message' => $msg
                ];
            }
        } catch (Exception $e) {
            Log::error("NyTimes: " . $e->getMessage());
            return [
                'status' => 'false',
                'message' => 'API Error'
            ];
        }
    }
}
