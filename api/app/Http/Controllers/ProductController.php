<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Product;

class ProductController extends Controller
{
    public function get()
    {
        $products = Product::get();

        foreach($products as $product) {
            $product->category;
            $product->cashier;
        }

        return response()->json($products);
    }

    public function find($id)
    {
        $validated = Validator::make(['id' => $id], [
            'id' => 'required|exists:products,id'
        ]);

        if($validated->fails()) {
            return response()->json(
                $validated->errors()
            , 422);
        }

        $product = Product::findOrFail($id);
        $product->category;
        $product->cashier;

        return response()->json($product);
    }

    public function post(Request $req)
    {
        $validated = Validator::make($req->all(), [
            'name' => 'required|max:191',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'cashier_id' => 'required|exists:cashiers,id'
        ]);

        if($validated->fails()) {
            return response()->json(
                $validated->errors()
            , 422);
        }

        try {
            $product = new Product;
            $product->name = $req->name;
            $product->price = $req->price;
            $product->category_id = $req->category_id;
            $product->cashier_id = $req->cashier_id;
            $product->save();
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500);
        }

        return response()->json([
            'message' => 'success',
            'data' => $product
        ]);
    }

    public function put(Request $req)
    {
        $validated = Validator::make($req->all(), [
            'id' => 'required|exists:products,id',
            'name' => 'required|max:191',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'cashier_id' => 'required|exists:cashiers,id'
        ]);

        if($validated->fails()) {
            return response()->json(
                $validated->errors()
            , 422);
        }

        try {
            $product = Product::findOrFail($req->id);
            $product->name = $req->name;
            $product->price = $req->price;
            $product->category_id = $req->category_id;
            $product->cashier_id = $req->cashier_id;
            $product->save();
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500);
        }

        return response()->json([
            'message' => 'success',
            'data' => $product
        ]);
    }

    public function delete($id)
    {
        $validated = Validator::make([
            'id' => $id
        ], [
            'id' => 'required|exists:products,id'
        ]);

        if($validated->fails()) {
            return response()->json(
                $validated->errors()
            , 422);
        }

        try {
            $product = Product::findOrFail($id);
            $product->delete();
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500);
        }

        return response()->json([
            'message' => 'success',
            'data' => $product
        ]);
    }
}
