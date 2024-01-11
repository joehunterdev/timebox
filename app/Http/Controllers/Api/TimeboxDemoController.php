<?php

namespace App\Http\Controllers\Api;

// use App\Models\Timebox;
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
        $timeboxes = session()->get('timeboxes', []);

        // Retrieve the timeboxes from the session
        if (count($timeboxes) == 0) {
            $this->initSession($start);
        }
        $timeboxes = session()->get('timeboxes');
        Log::channel("api")->info("index ");
        return response()->json($timeboxes);
    }

    public  function initSession($start = "")
    {
        // Convert the start date to a Carbon instance and set the time to 00:00:00
        $start = \Carbon\Carbon::parse($start)->setTime(0, 0, 0);
        $timeFormat = 'Y-m-d\TH:i';
        $timeboxes = [
            ['id' => 1, 'text' => 'Meditate', 'duration' => 30, "status" => "done", "start" => $start->copy()->setTime(date("H"), 00, 0)->format($timeFormat)],
            ['id' =>  2, 'text' => 'Typescript study', 'duration' => 60, "status" => "todo", "start" => $start->copy()->setTime(date("H"), 30, 0)->format($timeFormat)],
            ['id' =>  3, 'text' => 'Apply for jobs', 'duration' => 90, "status" => "todo", "start" => $start->copy()->setTime(date("H") + 2, 30, 0)->format($timeFormat)],
            ['id' =>  4, 'text' => 'Excercise', 'duration' => 30, "status" => "todo", "start" => $start->copy()->setTime(date("H") + 4, 30, 0)->format($timeFormat)],
            ['id' =>  5, 'text' => 'Dinner', 'duration' => 30, "status" => "todo", "start" => $start->copy()->setTime(date("H") + 7, 30, 0)->format($timeFormat)],
        ];

        session(['timeboxes' => $timeboxes]);
    }



    public function store(Request $request)
    {          
        //Try a post request
        
        Log::channel("api")->info("Try store ");

        try {
            error_reporting(E_ALL);

            // Your existing code...
            // Log::channel("api")->info("Store ses: " . print_r(session()->get('timeboxes', []), true));
            // Get the timeboxes from the session, or an empty array if they don't exist

            $timeboxes = session()->get('timeboxes');
            
            // Generate the next ID
            $nextId = count($timeboxes) > 0 ? max(array_column($timeboxes, 'id')) + 1 : 1;
            $nextId = (string) $nextId;
 
            // Mock the Timebox creation
            $timebox = [
                'id' => $nextId,
                'text' =>"test",
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

            Log::channel("api")->error("Error in store method: " . $e->getMessage());
            return response()->json(['error' => 'Error in store method: ' . $e->getMessage()], 500);
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
        // Find the timebox in the array and delete it...
        // ...
        // If the timebox is found, update it
        // if ($index !== false) {
        //     $timeboxes[$index] = $updatedTimebox;
        // }

        return response()->json(null, 204);
    }
}
