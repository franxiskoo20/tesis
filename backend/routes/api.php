<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;

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
Route::get('users', [AuthController::class, 'allusers']);
Route::get('prueba', [ProductController::class, 'index']);

// Ruta protegida que requiere autenticación
Route::apiResource('products', ProductController::class);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('register', [AuthController::class, 'register'])->middleware('role:Administrador');
    Route::get('roles', [RoleController::class, 'index'])->middleware('role:Administrador');
    Route::get('user', [AuthController::class, 'user'])->middleware('role:Administrador');

    Route::post('logout', [AuthController::class, 'logout']);
});
