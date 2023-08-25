<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'source',
        'category',
        'description',
        'content',
        'image_url',
        'url',
        'published_at'
    ];
}
