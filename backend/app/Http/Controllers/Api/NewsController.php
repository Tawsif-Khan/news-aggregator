<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\News\Search;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use App\Service\News\NewsService;
use App\Models\Source;

class NewsController extends Controller
{
    public function searchNews(Search $request, NewsService $news): JsonResponse
    {
        try {
            $response = $news->localSearch($request);
            // $response = $news->localSearch($request);
            return response()->json($response);
        } catch (\Exception $e) {
            Log::error("Error in NewsController@searchNews: {$e->getMessage()}");
            return response()->json([
                'status' => 'error',
                'message' => "Something went wrong. Please try again later.",
            ]);
        }
    }

    public function getSources(Source $sources): JsonResponse
    {
        try {
            return response()->json($sources->all());
        } catch (\Exception $e) {
            Log::error("Error in NewsController@getSources: {$e->getMessage()}");
            return response()->json([
                'status' => 'error',
                'message' => "Something went wrong. Please try again later."
            ]);
        }
    }
}
