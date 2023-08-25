<?php

namespace App\Service\Auth;

use App\Http\Requests\Login;
use App\Http\Requests\Register;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Service\Auth\Interface\AuthServiceInterface;

class AuthService implements AuthServiceInterface
{

    public function register(Register $request)
    {
        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password
        ]);
    }

    public function attemptLogin(Login $request)
    {
        return Auth::attempt([
            'email' => $request->email,
            'password' => $request->password
        ]);
    }

    public function getUser()
    {
        return Auth::user();
    }

    public function generateToken(User $user)
    {
        return explode('|', $user->createToken($user->email, ['candidate'])->plainTextToken)[1];
    }

    public function revokeAllTokens(User $user)
    {
        $user->tokens()->delete();
    }
}
