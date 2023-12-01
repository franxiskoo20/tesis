<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{

    public function run()
    {
        // Primero, asegúrate de que el rol de administrador esté creado.

        $adminRoleId = Role::firstOrCreate(['role_type' => 'Administrador'])->id;
        $jefeRoleId = Role::firstOrCreate(['role_type' => 'Jefe Comercial'])->id;

        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin',
            'password' => Hash::make('123123'),
            'role_id' => $adminRoleId,
        ]);

        User::create([
            'name' => 'Jefe',
            'email' => 'jefe@jefe',
            'password' => Hash::make('123123'),
            'role_id' => $jefeRoleId,
        ]);
    }
}
