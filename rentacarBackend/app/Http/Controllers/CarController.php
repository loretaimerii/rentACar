<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CarController extends Controller{

    public function index(){
        //return all of the cars that are in the database
        return Car::all();
    }

    //post
    public function store(Request $request){
         $request->validate([
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|string|max:4',
            'price' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imageName = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();

            $image->storeAs('public/cars', $imageName,'public');
        }

        $car = Car::create([
            'make' => $request->make,
            'model' => $request->model,
            'year' => $request->year,
            'price' => $request->price,
            'description' => $request->description,
            'image' => $imageName, 
        ]);

       
        return response()->json([
            'message' => 'Car created successfully',
            'id' => $car->id,
            'make' => $car->make,
            'model' => $car->model,
            'year' => $car->year,
            'price' => $car->price,
            'description' => $car->description,
            'image' => asset('storage/cars/' . $car->image), 
        ],201);
    }

    //get
    public function show(Car $car){
        //to show only one car
        return $car;
    }

    //put
    public function update(Request $request, Car $car){
        $incomingFields=$request->validate([
            'make'=>'required',
            'model'=>'required',
            'year'=>'required',
            'price'=>'required',
            'description'=>'nullable',
            'image'=>'nullable',
        ]);

        $car->update($incomingFields);
        return response()->json([
            'message' => 'Car updated successfully',
            'data' => $car
        ], 200);
    }

    //delete
    public function destroy(Car $car){
        try {
            $car->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
