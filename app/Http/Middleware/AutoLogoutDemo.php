<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AutoLogoutDemo
{
    /**
     * Logout when the user is demo
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Do nothing if the user is not demo
        if (! Auth::user()?->is_demo) {
            return $next($request);
        }

        // Logout the user
        Auth::logout();
        // Invalidate session
        $request->session()->invalidate();
        // Regenerate CSRF Token
        $request->session()->regenerateToken();

        return $next($request);
    }
}
