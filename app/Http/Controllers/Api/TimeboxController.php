<?php

namespace App\Http\Controllers\Api;

use App\Models\Timebox;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;


class TimeboxController extends Controller
{
    public function index($start = "")
    {

        if ($start) {

            $boxes = Timebox::orderBy('start', 'asc')->get();

            // Convert the start date to a Carbon instance
            $start = \Carbon\Carbon::parse($start);

            // Calculate the end date by adding 24 hours to the start date
            $end = $start->copy()->addDay();

            $boxes = Timebox::whereBetween('start', [$start, $end])
                ->where('user_id', auth()->id())
                ->orderBy('start', 'asc')
                ->get();
        } else {
            $boxes = Timebox::orderBy('start', 'asc')->get();
        }


        return $boxes;
    }

    public function store(Request $request)
    {
        $timebox = Timebox::create($request->all() + ['user_id' => auth()->id()]);
       // Log::channel("api")->info($timebox);
        return response()->json($timebox, 201);
    }

    public function show(Timebox $timebox)
    {
        return $timebox;
    }

    public function update(Request $request, Timebox $timebox)
    {

        $timebox->update($request->all());
        return response()->json($timebox, 200);
    }

    public function destroy(Timebox $timebox)
    {
        $timebox->delete();
        return response()->json(null, 204);
    }
}
