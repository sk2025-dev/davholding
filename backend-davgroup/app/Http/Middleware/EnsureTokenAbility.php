<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureTokenAbility
{
    public function handle(Request $request, Closure $next, string $ability): Response
    {
        if (!$request->user() || !$request->user()->tokenCan($ability)) {
            abort(403, "Action non autorisée pour ce compte.");
        }

        return $next($request);
    }
}
