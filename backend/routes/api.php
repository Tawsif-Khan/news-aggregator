<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\NewsController;


Route::prefix('auth')->controller(AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
});
Route::prefix('auth')->middleware('auth:sanctum')->controller(AuthController::class)->group(function () {
    Route::get('logout', 'logout');
    Route::get('check', 'check');
});

Route::prefix('user')->middleware('auth:sanctum')->controller(UserController::class)->group(function () {
    Route::get('feed', 'feed');
    Route::put('feed', 'updateFeed');
    Route::put('profile-update', 'updateProfile');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/sources', [NewsController::class, 'getSources']);
    Route::get('/search-news', [NewsController::class, 'searchNews']);
});
