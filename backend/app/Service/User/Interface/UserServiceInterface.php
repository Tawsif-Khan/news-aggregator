<?php

namespace App\Service\User\Interface;

use App\Http\Requests\Feed\PreferredSettings;
use App\Http\Requests\UpdateUser;

interface UserServiceInterface
{
    public function updateUser(UpdateUser $data);
    public function updatePreferredSettings(PreferredSettings $request);
    public function userFeed();
}
