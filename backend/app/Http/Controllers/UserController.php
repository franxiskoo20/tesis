<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Interfaces\UserRepositoryInterface;



class UserController extends Controller
{

    private $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    // Obtener todos los usuarios
    public function allUsers()
    {
        $users = $this->userRepository->getAll();
        return response()->json($users);
    }
  
    public function update(Request $request, $id)
    {
        $data = $request->all();
        $user = $this->userRepository->update($id, $data);
        return response()->json(['user' => $user, 'message' => 'User updated successfully']);
    }

    public function delete($id)
    {
        $this->userRepository->delete($id);
        return response()->json(['message' => 'User deleted successfully']);
    }
}
