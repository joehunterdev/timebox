<?php

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use App\Mail\TestMail;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Log;
use Laravel\SerializableClosure\Serializers\Signed;
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

Route::get('/email/verify', function () {
    Log::channel('api')->info('Verify');
    return redirect('/auth?status=reset_password_link_sent');
})->name('verification.notice');
 

// Route::get('/reset-password/{token}', function (string $token) {
//     // return view('auth.reset-password', ['token' => $token]);
//     return redirect('/auth?status=reset_password_link_sent&token='.$token);

    
// })->middleware('guest')->name('password.reset');

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
 

//http://localhost:8000/api/email/verify/3/aabf341a6a9d5f5808ce789a1b679d37fabc6066?expires=1705957581&signature=5888af0b414c97f87e4d0828eff62a5ba10a5ab3dcd29393d3dd1f1a12d93fa7


//Static Mockup
// Route::get('/static', function () {
//     return view('static');
// });
