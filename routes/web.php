<?php

use App\Http\Controllers\CardController;
use App\Http\Controllers\HomeController;
use App\Models\Issuer;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('cards.create');
});

Auth::routes();

Route::get('/issuers/all', function () {
    return Issuer::all();
});

Route::post('/cards', [CardController::class, 'store']);

Route::middleware('auth:sanctum')->get('/cards', [CardController::class, 'index']);
Route::middleware('auth:sanctum')->delete('/cards/{card}', [CardController::class, 'destroy']);

Route::get('/home', [HomeController::class, 'index'])->name('home');
