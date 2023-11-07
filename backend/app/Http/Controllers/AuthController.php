<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    // Registro de usuario
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'password' => 'required|string|min:3',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    // Inicio de sesión y generación de token
    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required',
            'password' => 'required',

        ]);

        if (!Auth::attempt($validatedData)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = User::where('email', $validatedData['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    // Cierre de sesión y revocación de token
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'You have successfully logged out and the token was successfully deleted']);
    }

    // Cierre de sesión y revocación de token
    public function allusers()
    {
        $users = User::all();
        return response()->json($users);
    }

    // Obtener información del usuario autenticado
    public function user()
    {
        $user = Auth::user();
        return response()->json([
            'name' => $user->name,
            'email' => $user->email,
        ]);
    }
}
