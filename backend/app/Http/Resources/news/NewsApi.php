<?php

namespace App\Http\Resources\news;

use Illuminate\Http\Resources\Json\JsonResource;

class NewsApi extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $data = parent::toArray($request);
        return [
            'source' => $data['source']['name'],
            'author' => $data['author'],
            'category' => isset($data['section']) ? $data['section'] : '',
            'title' => $data['title'],
            'description' => strip_tags($data['description']),
            'url' => $data['url'],
            'image_url' => $data['urlToImage'],
            'published_at' => date('Y-m-d H:i:s', strtotime($data['publishedAt'])),
            'content' => strip_tags($data['content'])
        ];
    }
}
