<?php

namespace App\Repositories;

use App\Interfaces\ServiceOrderRepositoryInterface;
use App\Models\ServiceOrder;

class ServiceOrderRepository implements ServiceOrderRepositoryInterface
{
  public function getAll()
  {
    return ServiceOrder::all();
  }
}
