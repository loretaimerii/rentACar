<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','car_id','start_date','end_date'];

    //
    public function car(){
        return $this->belongsTo(Car::class,'car_id');
    }
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
}
