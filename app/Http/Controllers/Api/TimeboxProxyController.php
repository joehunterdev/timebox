<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Api\TimeboxController;
use App\Http\Controllers\Api\TimeboxDemoController;
use App\Models\Timebox;
use Illuminate\Support\Facades\Log;

class TimeboxProxyController extends Controller
{
    public function index(Request $request, $start = "")
    {
        //Auth isnot enough here
        if ($request->user()) {

            Log::channel("api")->error("Proxy Index authed");
            $controller = resolve(TimeboxController::class);

        } else {
            Log::channel("api")->error("Proxy not authed");

            $controller = resolve(TimeboxDemoController::class);
        }

        return $controller->index($start);
    }

    public function store(Request $request)
    {
        if (Auth::check()) {
            $controller = resolve(TimeboxController::class);
        } else {
            $controller = resolve(TimeboxDemoController::class);
        }
        return $controller->store($request);
    }

    public function show(Request $request, Timebox $timebox)
    {
        if (Auth::check()) {
            $controller = resolve(TimeboxController::class);
        } else {
            $controller = resolve(TimeboxDemoController::class);
        }
        return $controller->show($request, $timebox);
    }

    public function update(Request $request, Timebox $timebox)
    {
        if (Auth::check()) {
            $controller = resolve(TimeboxController::class);
        } else {
            $controller = resolve(TimeboxDemoController::class);
        }
        return $controller->update($request, $timebox);
    }

    public function destroy(Request $request, Timebox $timebox)
    {
        if (Auth::check()) {
            $controller = resolve(TimeboxController::class);
        } else {
            $controller = resolve(TimeboxDemoController::class);
        }

        return $controller->destroy($timebox);
    }


    // Repeat for other methods as necessary...
}
