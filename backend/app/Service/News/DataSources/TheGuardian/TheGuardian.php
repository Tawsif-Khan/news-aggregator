<?php

namespace App\Service\News\DataSources\TheGuardian;

use Illuminate\Support\Facades\Http;
use Exception;
use App\Http\Resources\news\TheGuardian as TheGuardianResource;
use App\Service\News\DataSources\Interface\DataSource;
use Illuminate\Support\Facades\Log;

final class TheGuardian implements DataSource
{
    public function __construct(
        private $endpoint = null,
        private $api_key = null
    ) {
        $this->endpoint = config('news.THEGUARDIAN_ENDPOINT');
        $this->api_key = config('news.THEGUARDIAN_KEY');
    }

    //Search
    public function searchNews(array $data): array
    {
        $payload = [
            'api-key' => $this->api_key,
            'page' => $data['page'] ?? '',
            'page-size' => 100,
        ];
        $payload = urldecode(http_build_query(array_filter($payload)));
        try {
            $response = Http::get($this->endpoint . '/search?' . $payload);
            if (isset($response->json()['response']) && isset($response->json()['response']['results'])) {
                return [
                    'status' => 'success',
                    'totalResults' => $response->json()['response']['total'],
                    'data' => TheGuardianResource::collection($response->json()['response']['results'])->resolve()
                ];
            } else {
                Log::error("TheGuardian: " . $response);
                return [
                    'status' => 'false',
                    'message' => "API Error"
                ];
            }
        } catch (Exception $e) {
            Log::error("TheGuardian: " . $e->getMessage());
            return [
                'status' => 'false',
                'message' => 'API Error'
            ];
        }
    }
}
