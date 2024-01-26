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
        if ($request->user()) {
            $controller = resolve(TimeboxController::class);
        } else {
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

            // Create a new Timebox instance with the data from the request
            $newTimebox = new Timebox($request->all());
            $newTimebox->id = $id; // Set the ID of the new Timebox

            return $controller->update($request, $newTimebox);
        } else {
            $controller = resolve(TimeboxDemoController::class);
            return $controller->update($request, $id);
        }
    }

    public function destroy(Timebox $timebox)
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
