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
        // $adminRoleId = Role::where('role_type', $data[''])->first()->id;

        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role_id' => $data['role_id'],
        ]);
    }

    public function findByEmail(string $email)
    {
        return User::where('email', $email)->firstOrFail();
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

    public function getAll()
    {
        return User::with('role:id,role_type')->get();
        // return User::all();
    }

    public function update($id, array $data)
    {
        $user = User::findOrFail($id);
        $user->update($data);
        return $user;
    }

    public function delete($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return $user;
    }
}
