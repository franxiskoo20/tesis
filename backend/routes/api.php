<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Rutas de autenticación
Route::post('login', [AuthController::class, 'login']);

// Rutas de prueba
Route::get('users', [UserController::class, 'allusers']);
Route::get('prueba', [ProductController::class, 'index']);

Route::apiResource('products', ProductController::class);


Route::middleware('auth:sanctum')->group(function () {

    Route::post('register', [AuthController::class, 'register'])->middleware('role:Administrador');
    Route::get('roles', [RoleController::class, 'index'])->middleware('role:Administrador');

    Route::put('user/{id}', [UserController::class, 'update'])->middleware('role:Administrador');

    Route::delete('/user/{id}', [UserController::class, 'delete'])->middleware('role:Administrador');

    Route::put('user/{id}/change-password', [UserController::class, 'changePassword'])->middleware('role:Administrador');

    Route::get('user', [AuthController::class, 'user']);
    Route::post('logout', [AuthController::class, 'logout']);
});
