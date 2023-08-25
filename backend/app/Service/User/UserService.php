<?php

namespace App\Service\User;

use App\Models\User;
use App\Models\News;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Feed\PreferredSettings;
use App\Http\Requests\UpdateUser;
use App\Service\User\Interface\UserServiceInterface;

class UserService implements UserServiceInterface
{

    public function updateUser(UpdateUser $data)
    {
        $user = [
            'name' => $data->name,
        ];
        if ($data->password != null) {
            $user['password'] = $data->password;
        }

        return User::find(Auth::user()->id)->update($user);
    }

    public function updatePreferredSettings(PreferredSettings $request)
    {
        $data = [
            'preferred_categories' => $request->categories,
            'preferred_sources' => $request->sources,
            'preferred_authors' => $request->authors,
        ];

        return User::find(Auth::user()->id)->update($data);
    }

    public function userFeed()
    {
        $preferredCategories = Auth::user()->preferred_categories;
        $preferredSources = Auth::user()->preferred_sources;
        $preferredAuthors = Auth::user()->preferred_authors;

        $query = News::query();
        if (!empty($preferredCategories)) {
            $query->whereIn('category', $preferredCategories);
        }

        if (!empty($preferredSources)) {
            $query->whereIn('source', $preferredSources);
        }

        if (!empty($preferredAuthors)) {
            $query->whereIn('author', $preferredAuthors);
        }

        return $query->orderBy('published_at', 'DESC')->paginate(15);
    }
}
