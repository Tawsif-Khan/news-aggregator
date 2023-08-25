<?php

namespace App\Http\Resources\news;

use Illuminate\Http\Resources\Json\JsonResource;

class TheGuardian extends JsonResource
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
            'source' => 'The Guardian',
            'author' => '',
            'category' => $data['sectionName'],
            'title' => $data['webTitle'],
            'description' => "",
            'url' => $data['webUrl'],
            'image_url' => '',
            'published_at' => date('Y-m-d H:i:s', strtotime($data['webPublicationDate'])),
            'content' => ""
        ];
    }
}
