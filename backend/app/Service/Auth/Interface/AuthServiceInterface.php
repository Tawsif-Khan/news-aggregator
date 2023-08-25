<?php

namespace App\Service\Auth\Interface;

use App\Http\Requests\Register;
use App\Http\Requests\Login;
use App\Models\User;

interface AuthServiceInterface
{
    public function register(Register $request);
    public function attemptLogin(Login $request);
    public function getUser();
    public function generateToken(User $user);
    public function revokeAllTokens(User $user);
}
