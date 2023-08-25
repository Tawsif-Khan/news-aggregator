<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Feed\PreferredSettings;
use App\Http\Requests\UpdateUser;
use Illuminate\Support\Facades\Log;
use App\Service\User\UserService;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function feed()
    {
        try {
            $response =  $this->userService->userFeed();
            return response()->json($response);
        } catch (\Exception $e) {
            Log::error("Error in UserController@feed: {$e->getMessage()}");
            return response()->json([
                'status' => 'error',
                'message' => "Something went wrong. Please try again later."
            ]);
        }
    }

    public function updateFeed(PreferredSettings $request)
    {
        try {
            $this->userService->updatePreferredSettings($request);
            return response()->json([
                'status' => 'success',
                'message' => 'Preferred settings updated successfully'
            ]);
        } catch (\Exception $e) {
            Log::error("Error in UserController@updateFeed: {$e->getMessage()}");
            return response()->json([
                'status' => 'error',
                'message' => "Something went wrong. Please try again later."
            ]);
        }
    }

    public function updateProfile(UpdateUser $request)
    {
        try {
            $this->userService->updateUser($request);
            return response()->json([
                'status' => 'success',
                'message' => 'Profile updated successfully'
            ]);
        } catch (\Exception $e) {
            Log::error("Error in UserController@updateProfile: {$e->getMessage()}");
            return response()->json([
                'status' => 'error',
                'message' => "Something went wrong. Please try again later."
            ]);
        }
    }
}
