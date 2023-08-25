<?php

namespace App\Http\Resources\news;

use Illuminate\Http\Resources\Json\JsonResource;

class NyTimes extends JsonResource
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
        $section = isset($data['section_name']) ? $data['section_name'] : '';
        $subsection = isset($data['subsection_name']) ? $data['subsection_name'] : '';
        return [
            'source' => $data['source'],
            'author' => $data['byline']['original'],
            'category' => $section . ', ' . $subsection,
            'title' => $data['headline']['main'],
            'description' => strip_tags($data['snippet']),
            'url' => $data['web_url'],
            'image_url' => (isset($data['multimedia']) && count($data['multimedia']) > 0) ? $data['multimedia'][0]['url'] : '',
            'published_at' => date('Y-m-d H:i:s', strtotime($data['pub_date'])),
            'content' => strip_tags($data['lead_paragraph'])
        ];
    }
}
