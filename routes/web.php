<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
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

Route::get('/about', function () {
    return view('about');
});

//Verify email public
Route::get('/email/verify', function () {
    return redirect('/auth?status=reset_password_link_sent');
})->name('verification.notice');


//Verify email hash redirect
Route::get('/email/verify/{id}/{hash}', function (Request $request, $id, $hash) {
    $user = User::find($id);

    if (!$user || !hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
        // The provided ID and hash don't match a valid user, return an error
        return redirect('/auth?status=invalid_verification_link');
    }

    if ($user->hasVerifiedEmail()) {
        // The user has already verified their email, return a message
        return redirect('/auth?status=email_already_verified');
    }

    if ($user->markEmailAsVerified()) {
        event(new Verified($user));
    }

    return redirect('/auth?status=email_verified_successfully');
})->name('verification.verify');


Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
 

 

//Static Mockup
// Route::get('/static', function () {
//     return view('static');
// });
