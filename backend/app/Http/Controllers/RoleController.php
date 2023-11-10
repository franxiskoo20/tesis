<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interfaces\RoleRepositoryInterface;

class RoleController extends Controller
{
    protected $roleRepository;

    public function __construct(RoleRepositoryInterface $roleRepository)
    {
        $this->roleRepository = $roleRepository;
    }

    public function index()
    {
        $roles = $this->roleRepository->getAll();
        return response()->json($roles);
    }
}
