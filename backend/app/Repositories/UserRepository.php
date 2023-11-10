<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Interfaces\UserRepositoryInterface;
use App\Models\Role;

// use Symfony\Component\HttpFoundation\Response;

class UserRepository  implements UserRepositoryInterface
{
    public function create(array $data)
    {
        $adminRoleId = Role::where('role_type', 'Administrador')->first()->id;

        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role_id' => $adminRoleId,
        ]);
    }

    public function findByEmail(string $email)
    {
        return User::where('email', $email)->firstOrFail();
    }

    public function getAll()
    {
        return User::all();
    }

    public function getAuthenticatedUser($request)
    {
        $user = $request->user();
        $user->load('role'); // Eager load the role

        return [
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role->role_type ?? null,
        ];
    }
}
