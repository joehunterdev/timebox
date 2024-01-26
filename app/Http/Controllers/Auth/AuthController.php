<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;

class AuthController extends Controller
{

    use HasApiTokens;

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:3',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);


        $user->sendEmailVerificationNotification();

        $token = $user->createToken('api-token')->plainTextToken;

        event(new Registered($user));

        if (!$user->hasVerifiedEmail()) {
            return response(['message' => 'You need to verify your email account']);
        }
        return response()->json(['user' => $user->only('id', 'name', 'email'), 'access_token' => $token, 'token_type' => 'Bearer']);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Hi ' . $user->name . ' your logged in',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user->only('id', 'name', 'email'),
        ]);
    }

    public function logout()
    {
        // Use auth helper to get the authenticated user rather than request
        $user = auth()->user();
        
        // Log::channel("api")->info("logout token: " .  print_r($user->tokens, true)) ;

        if ($user) {
            $user->tokens()->delete();
            session()->flush();
            return response()->json(['message' => 'Logged out'], 200);
        } else {

            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['status' => __($status)], 200)
            : response()->json(['email' => __($status)], 400);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['message' => "Password has been reset"], 200);
        } elseif ($status === Password::INVALID_TOKEN) {
            return response()->json(['message' => "Invalid token: Check your inbox and try again"], 400);
        } elseif ($status === Password::INVALID_USER) {
            return response()->json(['message' => "Invalid user"], 400);
        } elseif ($status === Password::INVALID_PASSWORD) {
            return response()->json(['message' => "Invalid password"], 400);
        } else {
            return response()->json(['message' => "An unknown error occurred"], 400);
        }
    }
}
