<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Car;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
     //post
    public function store(Request $request){
        //create a new reservation
        $incomingFields=$request->validate([
            'car_id'=>['required','exists:cars,id'],
            'start_date'=>['required','date'],
            'end_date'=>['required','date','after:start_date']
        ]);

        $existingReservation = Reservation::where('car_id', $request->car_id)
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_date', [$request->start_date, $request->end_date])
                      ->orWhereBetween('end_date', [$request->start_date, $request->end_date]);
            })
            ->exists();

        if ($existingReservation) {
            return response()->json(['error' => 'Car is currently reserved.'], 400);
        }

        $reservation = Reservation::create([
            'user_id' => auth()->id(),
            'car_id' => $request->car_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'total_price' => $request->total_price ?? 0, 
        ]);
        
        return response()->json([
            'message' => 'Reservation created successfully',
            'data'=>$reservation
        ],201);
    }

    //delete
    public function destroy($id){
        $reservation = Reservation::find($id);
        if (!$reservation) {
            return response()->json(['error' => 'Reservation not found'], 404);
        }

        $reservation->delete();
        return response()->json(null,204);
    }

    public function userReservations(Request $request){
        $reservations = Reservation::where('user_id', auth()->id())->with('car')->get();
        return response()->json($reservations);
    }
}
