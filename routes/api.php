<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Api\TimeboxController;
use App\Http\Controllers\Api\TimeboxDemoController;
use App\Http\Controllers\Api\TimeboxProxyController;
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

//Timebox with demo switch
Route::get('/timeboxes/{start}', [TimeboxProxyController::class, 'index']);
Route::apiResource('timeboxes', TimeboxProxyController::class);

//Protected
Route::middleware('auth:sanctum', 'verified')->group(function () {
    Route::get('/logout', [AuthController::class, 'logout']);
    // Route::get('/timeboxes/{start}', 'App\Http\Controllers\Api\TimeboxController@index');
    // Route::apiResource('timeboxes', 'App\Http\Controllers\Api\TimeboxController');
    Route::post('/email/verification-notification', function (Request $request) {
        $request->user()->sendEmailVerificationNotification();
        return back()->with('message', 'Verification link sent!');
    })->name('verification.send');
});

// Route::get('/timeboxes-demo/{start}', 'App\Http\Controllers\Api\TimeboxDemoController@index');
// Route::apiResource('timeboxes-demo', 'App\Http\Controllers\Api\TimeboxDemoController');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/logout', [AuthController::class, 'logout']);
});

//Verfied
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::apiResource('user', 'App\Http\Controllers\User\UserController');
});

//Public
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);

Route::post('/reset-password', [AuthController::class, 'resetPassword'])
    ->middleware('guest')
    ->name('password.update');

Route::get('/reset-password/{token}', function (string $token) {
    return redirect('/reset-password?token=' . $token);
})->middleware('guest')->name('password.reset');
