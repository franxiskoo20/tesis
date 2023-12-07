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

        // User::create([
        //     'name' => 'Administrador',
        //     "email" => 'admin@admin.com',
        //     'password' => Hash::make('Franxiskoo20%'),
        //     'role_id' => $adminRoleId,
        // ]);

        // User::create([ 
        //     'name' => 'Jefe Comercial',
        //     'email' => 'jefe@jefe.com',
        //     'password' => Hash::make('Franxiskoo20%'),
        //     'role_id' => $jefeRoleId,
        // ]);
        // User::create([
        //     'name' => 'Francisco',
        //     'email' => 'adm@adm',
        //     'password' => Hash::make('asd'),
        //     'role_id' => $adminRoleId,
        // ]);


        User::create([
            'name' => 'Administrador',
            "email" => 'asd@asd',
            'password' => Hash::make('asd'),
            'role_id' => $adminRoleId,
        ]);
    }
}
