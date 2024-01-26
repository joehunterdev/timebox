<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{

    public function destroy(string $id)
    {
        $currentUser = auth()->user();

        if ($currentUser) {
            $userToDelete = User::find($id);

            if ($userToDelete) {
                // Check if the current user is the same as the user to delete, or if the current user is an admin
                //|| $currentUser->isAdmin()
                if ($currentUser->id === $userToDelete->id) {
                    $userToDelete->delete();
                    return response()->json(['message' => 'User deleted']);
                } else {
                    return response()->json(['message' => 'Unauthorized'], 403);
                }
            } else {
                return response()->json(['message' => 'User not found'], 404);
            }
        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }
}
