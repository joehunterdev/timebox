<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

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


// Route::post('/login', [AuthController::class, 'login']);
// Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//->name('register');
//Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/timeboxes/{start}', 'App\Http\Controllers\Api\TimeboxController@index');
    Route::apiResource('timeboxes', 'App\Http\Controllers\Api\TimeboxController');
    Route::apiResource('user', 'App\Http\Controllers\User\UserController');

});


// if (request()->getHost() == parse_url(env('APP_URL'), PHP_URL_HOST)) {
//     // Use TimeboxDemoController
//     Route::get('/timeboxes/{start}', 'App\Http\Controllers\Api\TimeboxDemoController@index');
//     Route::apiResource('timeboxes', 'App\Http\Controllers\Api\TimeboxDemoController');
// } 
// else {
//     // Use TimeboxController
//     Route::get('/timeboxes/{start}', 'App\Http\Controllers\Api\TimeboxController@index');
//     Route::apiResource('timeboxes', 'App\Http\Controllers\Api\TimeboxController');
// }
