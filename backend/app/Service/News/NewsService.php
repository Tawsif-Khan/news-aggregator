<?php

namespace App\Service\News;

use App\Service\News\Interface\NewsInterface;
use App\Service\News\DataSources\NewsAPI\NewsApi;
use App\Service\News\DataSources\TheGuardian\TheGuardian;
use App\Service\News\DataSources\NyTimes\NyTimes;
use Illuminate\Support\Facades\Log;
use App\Models\News as NewsModel;
use App\Http\Requests\News\Search;

class NewsService implements NewsInterface
{
    public function __construct(
        public $dataSources = []
    ) {
        $this->dataSources = [
            'NewsApi' => new NewsApi(),
            'TheGuardian' => new TheGuardian(),
            'NyTimes' => new NyTimes()
        ];
    }

    // local data search
    public function localSearch(Search $request)
    {
        $query = NewsModel::query();

        // Search by keyword in title, description, and content
        $query->where(function ($q) use ($request) {
            $q->where('title', 'LIKE', "%{$request->keyword}%")
                ->orWhere('description', 'LIKE', "%{$request->keyword}%")
                ->orWhere('content', 'LIKE', "%{$request->keyword}%");
        });

        // Filter by date range
        if (isset($request->fromDate) && isset($request->toDate)) {
            $query->whereBetween('published_at', [$request->fromDate, $request->toDate]);
        } elseif (isset($request->fromDate)) {
            $query->whereDate('published_at', $request->fromDate);
        } elseif (isset($request->toDate)) {
            $query->whereDate('published_at', $request->toDate);
        }

        // Filter by category
        if (isset($request->category)) {
            $query->where('category', 'LIKE', "%{$request->category}%");
        }

        // Filter by source
        if (isset($request->source)) {
            $query->where('source', 'LIKE', "%{$request->source}%");
        }

        return $query->orderBy('published_at', 'DESC')->paginate(15);
    }

    // live api search
    public function deepSearch(array $request): array
    {
        $total = 0;
        $data = [];
        foreach ($this->dataSources as $dataSource) {
            $response = $dataSource->searchNews($request);
            if ($response['status'] == 'success') {
                $total += $response['totalResults'];
                $data = array_merge($data, $response['data']);
            } else {
                Log::error($response);
            }
        }
        return [
            'status' => 'success',
            'totalResults' => $total,
            'showingResults' => count($data),
            'data' => $data
        ];
    }

    public function sources()
    {
        return $this->dataSources['NewsApi']->sources();
    }
}
