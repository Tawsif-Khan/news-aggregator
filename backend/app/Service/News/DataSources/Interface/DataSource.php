<?php

namespace App\Service\News\DataSources\Interface;

interface DataSource
{
    public function searchNews(array $data): array;
}
