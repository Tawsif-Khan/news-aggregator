<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Login;
use App\Http\Requests\Register;
use App\Jobs\SendEmailJob;
use Illuminate\Support\Facades\Log;
use App\Service\Auth\AuthService;

class AuthController extends Controller
{

    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Register $request)
    {
        try {
            $user = $this->authService->register($request);
            $token = $this->authService->generateToken($user);

            $details = [
                'title' => "Sign Up Successfully",
                'email' => $user->email,
                'body' => "Hi, $user->name, You have successfully registered.",
            ];
            SendEmailJob::dispatch($details);

            return response()->json([
                'status' => true,
                'message' => 'Register Successfully',
                'data' => $user,
                'token' => $token
            ]);
        } catch (\Exception $e) {
            Log::info("Error in AuthController@register: {$e->getMessage()}");
            return response()->json([
                'status' => false,
                'message' => 'Register Failed',
                'error' => 'Something went wrong',
            ], 400);
        }
    }

    public function login(Login $request)
    {
        if ($this->authService->attemptLogin($request)) {
            $user = $this->authService->getUser();
            $this->authService->revokeAllTokens($user);
            $token = $this->authService->generateToken($user);

            return response()->json([
                'status' => true,
                'message' => 'User Login Successfully',
                'data' => $user,
                'token' => $token
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Wrong Email or Password',
            ], 401);
        }
    }

    public function check()
    {
        return response()->json([
            'status' => true,
            'data' => $this->authService->getUser()
        ]);
    }

    public function logout()
    {
        $user = $this->authService->getUser();
        $this->authService->revokeAllTokens($user);

        return response()->json([
            'status' => true,
            'message' => 'User Logout Successfully'
        ]);
    }
}
