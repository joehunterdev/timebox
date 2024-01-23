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

class AuthController extends Controller
{

    public function register(Request $request)
    {
        Log::channel('api')->info('Register request', ['request' => $request->all()]);
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
        //Log::channel('api')->info('Login request', ['request' => $request->all()]);
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
        //Log::channel('api')->info('User', ['user' =>$user]);

        $token = $user->createToken('api-token')->plainTextToken;
        //Log::channel('api')->info('Token', ['token' =>$token]);

        return response()->json([
            'message' => 'Hi ' . $user->name . ' your logged in',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user->only('id', 'name', 'email'),
        ]);
    }

    public function logout()
    {
        //Use auth helper to get the authenticated user rather than request
        if (auth()->check()) {
            auth()->user()->tokens()->delete();
            return response()->json(['message' => 'Logged out']);
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
        Log::channel('api')->info('Reset password request', ['request' => $request->all()]);
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
        // return response()->json([
        //     'message' => 'Hi ' . $user->name . ' your logged in',
        //     'access_token' => $token,
        //     'token_type' => 'Bearer',
        //     'user' => $user->only('id', 'name', 'email'),
        // ]);
        Log::channel('api')->info('Reset password', ['status' => $status]);
        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['message' => "Password has been reset"], 200);
        } elseif ($status === Password::INVALID_TOKEN) {
            return response()->json(['message' => "Invalid token"], 400);
        } elseif ($status === Password::INVALID_USER) {
            return response()->json(['message' => "Invalid user"], 400);
        } elseif ($status === Password::INVALID_PASSWORD) {
            return response()->json(['message' => "Invalid password"], 400);
        } else {
            return response()->json(['message' => "An unknown error occurred"], 400);
        }
    }
}
