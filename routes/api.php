<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

if (request()->getHost() == parse_url(env('APP_URL'), PHP_URL_HOST)) {
    // Use TimeboxDemoController
    Route::get('/timeboxes/{start}', 'App\Http\Controllers\Api\TimeboxDemoController@index');
    Route::apiResource('timeboxes', 'App\Http\Controllers\Api\TimeboxDemoController');
} else {
    // Use TimeboxController
    Route::get('/timeboxes/{start}', 'App\Http\Controllers\Api\TimeboxController@index');
    Route::apiResource('timeboxes', 'App\Http\Controllers\Api\TimeboxController');
}
