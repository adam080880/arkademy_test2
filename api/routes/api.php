<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

header("Access-Control-Allow-Origin", "*");
header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers", "Content-Type, X-Auth-Token, Origin");

Route::get('/cashiers', 'CashierController@get');
Route::get('/cashier/{id}', 'CashierController@find');
Route::post('/cashier', 'CashierController@post');
Route::put('/cashier', 'CashierController@put');
Route::delete('/cashier', 'CashierController@delete');

Route::get('/categories', 'CategoryController@get');
Route::get('/category/{id}', 'CategoryController@find');
Route::post('/category', 'CategoryController@post');
Route::put('/category', 'CategoryController@put');
Route::delete('/category', 'CategoryController@delete');

Route::get('/products', 'ProductController@get');
Route::get('/product/{id}', 'ProductController@find');
Route::post('/product', 'ProductController@post');
Route::put('/product', 'ProductController@put');
Route::delete('/product/{id}', 'ProductController@delete');
