<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\UserAuthenticationController;
use App\Http\Controllers\ReservationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('cars', [CarController::class, 'index'])->name('car.index');
Route::get('cars/{car}', [CarController::class, 'show'])->name('car.show');
Route::post('cars', [CarController::class, 'store'])->name('cars.store');
Route::put('cars/{car}', [CarController::class, 'update'])->name('cars.update');
Route::delete('cars/{car}', [CarController::class, 'destroy'])->name('cars.destroy');

Route::post('login', [UserAuthenticationController::class, 'login']);
Route::post('register', [UserAuthenticationController::class, 'register']);
Route::post('logout', [UserAuthenticationController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/reservations', [ReservationController::class, 'store'])->middleware('auth:sanctum');
Route::get('/myReservations', [ReservationController::class, 'userReservations'])->middleware('auth:sanctum');
Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
