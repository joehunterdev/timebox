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


    public function update(Request $request, $timebox)
    {
        $id = $timebox instanceof Timebox ? $timebox : (int) $timebox;

        if (Auth::check()) {
            $controller = resolve(TimeboxController::class);
            return $controller->update($request, $id);

        } else {
            $controller = resolve(TimeboxDemoController::class);
            return $controller->update($request, $id);

        }
    }

    public function destroy($timebox)
    {
        $id = $timebox instanceof Timebox ? $timebox : (int) $timebox;
        if (Auth::check()) {
            $controller = resolve(TimeboxController::class);
        } else {
            $controller = resolve(TimeboxDemoController::class);
        }

        return $controller->destroy($timebox);
    }


    // Repeat for other methods as necessary...
}
