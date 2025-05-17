<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserAuthenticationController extends Controller
{
    public function register(Request $request){
       
        $incomingFields = $request->validate([
            'name' =>  ['required','min:3','max:15', Rule::unique('users','name')],
            'email' =>  ['required','email', Rule::unique('users','email')],
            'password' => ['required','min:8','max:50'],
            'role'=>'required|in:user,admin'
        ]);

        $incomingFields['password']=bcrypt($incomingFields['password']);
        $user = User::create($incomingFields);


        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User Account Created Successfully',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'role' => $user->role,
        ]
        ], 201);
    }

    public function login(Request $request)
    {
        $email = strtolower($request->input('email'));
        $password = $request->input('password');

        $credentials = [
            'email' => $email,
            'password' => $password
        ];
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid login credentials'
            ], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'role' => $user->role,
        ]
        ],200);
    }

    public function logout(){
        
        auth()->user()->tokens()->delete();

        return response()->json([
            'message' => 'Succesfully Logged out'
        ], 200);
    }

}
