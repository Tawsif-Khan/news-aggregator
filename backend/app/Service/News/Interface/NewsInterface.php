<?php

namespace App\Service\News\Interface;

use App\Http\Requests\News\Search;

interface NewsInterface
{
    public function localSearch(Search $request);
    public function deepSearch(array $request): array;
    public function sources();
}
