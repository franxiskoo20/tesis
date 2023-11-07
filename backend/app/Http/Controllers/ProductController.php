<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
        ]);

        $product = Product::create($validatedData);

        return response()->json($product, Response::HTTP_CREATED);
    }

    // Display the specified resource.
    public function show(Product $product)
    {
        return response()->json($product);
    }

    // Update the specified resource in storage.
    public function update(Request $request, Product $product)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
        ]);

        $product->update($validatedData);

        return response()->json($product);
    }

    // Remove the specified resource from storage.
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}