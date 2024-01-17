<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
//
//To enable the client side routing
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');

//Static Mockup
// Route::get('/static', function () {
//     return view('static');
// });

 