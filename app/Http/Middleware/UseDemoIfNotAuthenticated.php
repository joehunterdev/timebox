<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Api\TimeboxController;
use App\Http\Controllers\Api\TimeboxDemoController;

class UseDemoIfNotAuthenticated
{
    public function handle($request, Closure $next)
    {
        if (Auth::check() && Auth::user()->hasVerifiedEmail()) {
            // Use the TimeboxController
            $request->route()->setParameter('controller', 'TimeboxController');
        } else {
            // Use the TimeboxDemoController
            $request->route()->setParameter('controller', 'TimeboxDemoController');
        }
    
        return $next($request);
    }
}