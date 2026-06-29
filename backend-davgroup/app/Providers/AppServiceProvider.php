<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void {}

    public function boot(): void
    {
        // URL de réinitialisation pointant vers l'app mobile / frontend
        ResetPassword::createUrlUsing(function ($user, string $token) {
            $appUrl = env('FRONTEND_URL', 'http://localhost:5173');
            return "{$appUrl}/reset-password?token={$token}&email=" . urlencode($user->email);
        });
    }
}
