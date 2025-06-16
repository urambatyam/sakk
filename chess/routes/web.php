<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/db-test', function () {
    try {
        $result = DB::select('SELECT DATABASE() AS db');
        return response()->json([
            'success' => true,
            'message' => 'Sikeres kapcsolat!',
            'database' => $result[0]->db
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Hiba az adatbázis kapcsolattal!',
            'error' => $e->getMessage()
        ]);
    }
});
