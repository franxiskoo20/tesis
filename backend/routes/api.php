<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BusinessController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceTypeController;

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

// Rutas protegidas
Route::middleware('auth:sanctum')->group(function () {

    Route::get('users', [UserController::class, 'index']);
    Route::post('register', [AuthController::class, 'register'])->middleware('role:Administrador');
    Route::get('roles', [RoleController::class, 'index'])->middleware('role:Administrador');

    Route::put('user/{id}', [UserController::class, 'update'])->middleware('role:Administrador');

    Route::delete('/user/{id}', [UserController::class, 'destroy'])->middleware('role:Administrador');

    Route::put('user/{id}/change-password', [UserController::class, 'changePassword'])->middleware('role:Administrador');

    Route::get('user', [AuthController::class, 'user']);
    Route::post('logout', [AuthController::class, 'logout']);

    Route::prefix('customers')->group(function () {
        Route::get('/', [CustomerController::class, 'index']); // Obtener todos los clientes
        Route::post('/', [CustomerController::class, 'store']); // Crear un nuevo cliente
        Route::put('/{id}', [CustomerController::class, 'update']); // Actualizar un cliente
        Route::delete('/{id}', [CustomerController::class, 'destroy']); // Eliminar un cliente
    });
    Route::prefix('services')->group(function () {
        Route::get('/', [ServiceController::class, 'index']);
        Route::post('/', [ServiceController::class, 'store']);
        Route::put('/{id}', [ServiceController::class, 'update']);
        Route::delete('/{id}', [ServiceController::class, 'destroy']);
    });
    Route::prefix('services-type')->group(function () {
        Route::get('/', [ServiceTypeController::class, 'index']);
        Route::post('/', [ServiceTypeController::class, 'store']);
        Route::put('/{id}', [ServiceTypeController::class, 'update']);
        Route::delete('/{id}', [ServiceTypeController::class, 'destroy']);
    });

    Route::prefix('products')->group(function () {
        Route::get('/', [ProductController::class, 'index']);
        Route::post('/', [ProductController::class, 'store']);
        Route::put('/{id}', [ProductController::class, 'update']);
        Route::delete('/{id}', [ProductController::class, 'destroy']);
    });
    Route::prefix('businesses')->group(function () {
        Route::get('/', [BusinessController::class, 'index']);
        Route::post('/', [BusinessController::class, 'store']);
        Route::put('/{id}', [BusinessController::class, 'update']);
        Route::delete('/{id}', [BusinessController::class, 'destroy']);
    });
});
