<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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

        $token = $user->createToken('api-token')->plainTextToken;

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
            'feedback' => 'Hi ' . $user->name . ' your logged in',
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
}
