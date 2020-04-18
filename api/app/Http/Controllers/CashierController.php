<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Cashier;

class CashierController extends Controller
{
    public function get()
    {
        return response()->json(Cashier::get()); //send all cashiers as json
    }

    public function find($id)
    {
        $validated = Validator::make(['id' => $id], [
            'id' => 'required|exists:cashiers,id'
        ]);

        if($validated->fails()) {
            return response()->json(
                $validated->errors()
            , 422);
        }

        return response()->json(Cashier::findOrFail($id));
    }

    public function post(Request $req)
    {
        $validated = Validator::make($req->all(), [
            'name' => 'required'
        ]);

        if($validated->fails()) {
            return response()->json(
                $validated->errors()
            , 422);
        }

        try {
            $cashier = new Cashier;
            $cashier->name = $req->name;
            $cashier->save();
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500);
        }

        return response()->json([
            'message' => 'Success',
            'data' => $cashier
        ]);
    }

    public function put(Request $req)
    {
        $validated = Validator::make($req->all(), [
            'id' => 'required|exists:cashiers,id',
            'name' => 'required'
        ]);

        if($validated->fails()) {
            return response()->json(
                $validated->errors()
            , 422);
        }

        try {
            $cashier = Cashier::findOrFail($req->id);
            $cashier->name = $req->name;
            $cashier->save();
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500);
        }

        return response()->json([
            'message' => 'Success',
            'data' => $cashier
        ]);
    }

    public function delete(Request $req)
    {
        $validated = Validator::make($req->all(), [
            'id' => 'required|exists:cashiers,id',
            'name' => 'required'
        ]);

        if($validated->fails()) {
            return response()->json(
                $validated->errors()
            , 422);
        }

        try {
            $cashier = Cashier::findOrFail($req->id);
            $cashier->delete();
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500);
        }

        return response()->json([
            'message' => 'Success',
            'data' => $cashier
        ]);
    }
}
