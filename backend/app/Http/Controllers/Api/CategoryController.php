<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    public function index(Category $categories)
    {
        try {
            $categories = $categories->get();
            return $categories;
        } catch (\Exception $e) {
            Log::error("Error in CategoryController@index: {$e->getMessage()}");
            return response()->json([
                'status' => false,
                'message' => 'Categories Fetched Failed',
                'error' => 'Something went wrong',
            ], 400);
        }
    }
}
