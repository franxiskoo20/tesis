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

  public function getById($id)
  {
    return ServiceOrder::findOrFail($id);
  }

  public function create(array $data)
  {
    return ServiceOrder::create($data);
  }

  public function update($id, array $data)
  {
    $serviceOrder = ServiceOrder::findOrFail($id);
    $serviceOrder->update($data);
    return $serviceOrder;
  }

  public function delete($id)
  {
    $serviceOrder = ServiceOrder::findOrFail($id);
    $serviceOrder->delete();
    return $serviceOrder;
  }
}
