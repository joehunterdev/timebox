<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Ramsey\Uuid\Type\Time;
use App\Models\Timebox;

class TimeboxDemoController extends Controller
{
    public function __construct()
    {
        $this->middleware('throttle:60,1')->only(['store', 'update']);
    }

    public function index($start = "")
    {

        // try {
        $timeboxes = session()->get('timeboxes', []);
        // Retrieve the timeboxes from the session
        if (count($timeboxes) == 0) {
            $this->initSession($start);
        }
        $timeboxes = session()->get('timeboxes');
        return response()->json($timeboxes);
    }

    public  function initSession($start = "")
    {
        // Convert the start date to a Carbon instance and set the time to 00:00:00
        $start = \Carbon\Carbon::parse($start)->setTime(0, 0, 0);
        $timeFormat = 'Y-m-d\TH:i';
        $timeboxes = [
            ['id' =>  1, 'text' => 'Meditate', 'duration' => 30, "status" => "done", "start" => $start->copy()->setTime(date("H"), 0, 0)->format($timeFormat)],
            ['id' =>  2, 'text' => 'Study: Js Patterns', 'duration' => 60, "status" => "todo", "start" => $start->copy()->setTime(date("H") + 1, 30, 0)->format($timeFormat)],
            ['id' =>  3, 'text' =>  'Meditate', 'duration' => 30, "status" => "todo", "start" => $start->copy()->setTime(date("H") + 7, 00, 0)->format($timeFormat)],
            ['id' =>  4, 'text' => 'Excercise', 'duration' => 30, "status" => "done", "start" => $start->copy()->setTime(date("H") + 2, 30, 0)->format($timeFormat)],
            ['id' =>  5, 'text' => 'Make Dinner', 'duration' => 30, "status" => "doing", "start" => $start->copy()->setTime(date("H") + 4, 30, 0)->format($timeFormat)],
            ['id' =>  6, 'text' => 'Deep Work', 'duration' => 180, "status" => "doing", "start" => $start->copy()->setTime(date("H") + 5, 30, 0)->format($timeFormat)]

        ];

        session(['timeboxes' => $timeboxes]);
    }



    public function store(Request $request)
    {
        //Try a post request
        try {

            $timeboxes = session()->get('timeboxes');
            // Generate the next ID
            if (is_countable($timeboxes) && count($timeboxes) > 0) {
                $nextId = max(array_column($timeboxes, 'id')) + 1;
            } else {
                $nextId = 1;
            }
            $nextId = (int)$nextId;

            // Mock the Timebox creation
            $timebox = [
                'id' => $nextId,
                'text' => $request->input('text'),
                'duration' => $request->input('duration'),
                'status' => $request->input('status'),
                'start' => $request->input('start'),
            ];

            // Add the new timebox to the array
            $timeboxes[] = $timebox;

            // Store the updated timeboxes array in the session
            session()->put('timeboxes', $timeboxes);


            // Return the new timebox
            return response()->json($timebox, 201);
        } catch (\Exception $e) {

            return response()->json(['message' => 'Error in store method: '], 500);
        }
    }



    public function update(Request $request,  $timebox)
    {

        // Cast the ID to an integer
        $id = $timebox instanceof Timebox ? $timebox->id : (int) $timebox;

        // Retrieve the timeboxes from the session
        $timeboxes = session()->get('timeboxes', []);

        // Find the index of the timebox with the given ID
        $index = array_search($id, array_column($timeboxes, 'id'));

        if ($index === false) {
            return response()->json(['message' => 'Timebox not found'], 404);
        }

        // Update the timebox data
        $timeboxes[$index] = [
            'id' => $id,
            'text' => $request->input('text'),
            'duration' => $request->input('duration'),
            'status' => $request->input('status'),
            'start' => $request->input('start'),
        ];

        // Save the updated timeboxes back to the session
        session()->put('timeboxes', $timeboxes);

        return response()->json(['message' => 'Timebox updated successfully']);
    }

    public function destroy(Timebox $timebox)
    {
        // Retrieve the timeboxes from the session
        $timeboxes = session()->get('timeboxes', []);
        //Log::channel("api")->info("timeboxes destroy obj: " . json_encode($timebox));
        // Find the index of the timebox with the given ID
        $index = array_search($timebox->id, array_column($timeboxes, 'id'));

        // If the timebox is found, delete it
        if ($index !== false) {
            unset($timeboxes[$index]);
        }

        // Save the updated timeboxes back to the session
        session()->put('timeboxes', $timeboxes);

        // Return a response
        return response()->json(null, 204);
    }
}
