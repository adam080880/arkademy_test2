<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Category;

class CategoryController extends Controller
{
    public function get()
    {
        return response()->json(Category::get()); //send all categories as json
    }

    public function find($id)
    {
        $validated = Validator::make(['id' => $id], [
            'id' => 'required|exists:categories,id'
        ]);

        if($validated->fails()) {
            return response()->json(
                $validated->errors()
            , 422);
        }

        return response()->json(Category::findOrFail($id));
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
            $category = new Category;
            $category->name = $req->name;
            $category->save();
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500);
        }

        return response()->json([
            'message' => 'Success',
            'data' => $category
        ]);
    }

    public function put(Request $req)
    {
        $validated = Validator::make($req->all(), [
            'id' => 'required|exists:categories,id',
            'name' => 'required'
        ]);

        if($validated->fails()) {
            return response()->json(
                $validated->errors()
            , 422);
        }

        try {
            $category = Category::findOrFail($req->id);
            $category->name = $req->name;
            $category->save();
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500);
        }

        return response()->json([
            'message' => 'Success',
            'data' => $category
        ]);
    }

    public function delete(Request $req)
    {
        $validated = Validator::make($req->all(), [
            'id' => 'required|exists:categories,id',
        ]);

        if($validated->fails()) {
            return response()->json(
                $validated->errors()
            , 422);
        }

        try {
            $category = Category::findOrFail($req->id);
            $category->delete();
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500);
        }

        return response()->json([
            'message' => 'Success',
            'data' => $category
        ]);
    }
}
