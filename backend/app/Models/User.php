<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'preferred_categories',
        'preferred_sources',
        'preferred_authors',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'id',
        'password',
        'remember_token',
        'email_verified_at',
        'created_at',
        'updated_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    public function setPreferredCategoriesAttribute($value)
    {
        $this->attributes['preferred_categories'] = json_encode($value);
    }

    public function setPreferredSourcesAttribute($value)
    {
        $this->attributes['preferred_sources'] = json_encode($value);
    }

    public function setPreferredAuthorsAttribute($value)
    {
        $this->attributes['preferred_authors'] = json_encode($value);
    }

    public function getPreferredCategoriesAttribute($value)
    {
        return json_decode($value);
    }

    public function getPreferredSourcesAttribute($value)
    {
        return json_decode($value);
    }

    public function getPreferredAuthorsAttribute($value)
    {
        return json_decode($value);
    }
}
