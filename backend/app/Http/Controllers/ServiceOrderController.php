<?php

namespace App\Http\Controllers;

use App\Interfaces\ServiceOrderRepositoryInterface;
use Illuminate\Http\Request;

class ServiceOrderController extends Controller
{
    protected $serviceOrderRepository;

    public function __construct(ServiceOrderRepositoryInterface $serviceOrderRepository)
    {
        $this->serviceOrderRepository = $serviceOrderRepository;
    }

    public function index()
    {
        $serviceOrders = $this->serviceOrderRepository->getAll();
        return response()->json($serviceOrders);
    }
}
