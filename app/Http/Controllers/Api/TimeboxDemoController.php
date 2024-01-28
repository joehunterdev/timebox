<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;


class TimeboxDemoController extends Controller
{
    public function __construct()
    {
        $this->middleware('throttle:60,1')->only(['store', 'update']);
    }

    public function index($start = "")
    {
        Log::channel("api")->error("Demo Index");
        $isAuthenticated = \Illuminate\Support\Facades\Auth::check();
        \Illuminate\Support\Facades\Log::channel("api")->info('Authentication status: ' . ($isAuthenticated ? 'Authenticated' : 'Not authenticated'));

        try {
            $timeboxes = session()->get('timeboxes', []);

            // Check if $timeboxes is null
            if (!is_countable($timeboxes) || count($timeboxes) == 0) {
                $this->initSession($start);
                $timeboxes = session()->get('timeboxes');
            }
     
            return response()->json($timeboxes);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred. Please try again later.'], 500);
        }
    }

    public  function initSession($start = "")
    {
        // Convert the start date to a Carbon instance and set the time to 00:00:00
        $start = \Carbon\Carbon::parse($start)->setTime(0, 0, 0);
        $timeFormat = 'Y-m-d\TH:i';
        $timeboxes = [
            ['id' =>  1, 'text' => '🧘‍♂️ Meditate', 'duration' => 30, "status" => "done", "start" => $start->copy()->setTime(date("H"), 0, 0)->format($timeFormat)],
            ['id' =>  2, 'text' => '📚 Study: JS Patterns', 'duration' => 60, "status" => "todo", "start" => $start->copy()->setTime(date("H") + 1, 30, 0)->format($timeFormat)],
            ['id' =>  3, 'text' =>  '🧘‍♂️ Meditate', 'duration' => 30, "status" => "todo", "start" => $start->copy()->setTime(date("H") + 7, 00, 0)->format($timeFormat)],
            ['id' =>  4, 'text' => '🏋️‍♂️ Exercise', 'duration' => 30, "status" => "done", "start" => $start->copy()->setTime(date("H") + 2, 30, 0)->format($timeFormat)],
            ['id' =>  5, 'text' => '🍽️ Make Dinner', 'duration' => 30, "status" => "doing", "start" => $start->copy()->setTime(date("H") + 4, 30, 0)->format($timeFormat)],
            ['id' =>  6, 'text' => '💼 Deep Work', 'duration' => 180, "status" => "doing", "start" => $start->copy()->setTime(date("H") + 5, 30, 0)->format($timeFormat)],
            ['id' =>  7, 'text' => '🚶‍♂️ Take a Walk', 'duration' => 45, "status" => "todo", "start" => $start->copy()->setTime(date("H") + 3, 0, 0)->format($timeFormat)],
            ['id' =>  8, 'text' => '🎨 Paint', 'duration' => 60, "status" => "todo", "start" => $start->copy()->setTime(date("H") + 6, 0, 0)->format($timeFormat)],

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
            $nextId = (string) $nextId;

            // Mock the Timebox creation
            $timebox = [
                'id' => $nextId,
                'text' => $request->input('duration'),
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

            // Log::channel("api")->error("Error in store method: " . $e->getMessage());
            return response()->json(['message' => 'Error in store method: '], 500);
        }
    }



    public function update(Request $request)
    {

        // Mock the Timebox update
        $updatedTimebox = [
            'id' => $request->input('id'),
            'text' => $request->input('text'),
            'duration' => $request->input('duration'),
            'status' => $request->input('status'),
            'start' => $request->input('start'),
        ];

        // Retrieve the timeboxes from the session
        $timeboxes = session()->get('timeboxes', []);

        //Log::channel("api")->info("update get ses: " . print_r($timeboxes, true));

        // Find the index of the timebox with the given ID
        $index = array_search($updatedTimebox['id'], array_column($timeboxes, 'id'));

        // If the timebox is found, update it
        if ($index !== false) {
            $timeboxes[$index] = $updatedTimebox;
        }

        // Store the updated timeboxes back in the session
        session()->put('timeboxes', $timeboxes);
        //Log::channel("api")->info("update put ses: " . print_r($timeboxes, true));
        return response()->json($updatedTimebox, 200);
    }

    public function destroy($id)
    {
        $timeboxes = session()->get('timeboxes', []); 
          return response()->json(null, 204);
    }
}
