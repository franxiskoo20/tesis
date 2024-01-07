<?php

namespace App\Repositories;

use App\Interfaces\ServiceOrderRepositoryInterface;
use App\Models\ServiceOrder;

class ServiceOrderRepository implements ServiceOrderRepositoryInterface
{
  public function getAll()
  {
    return ServiceOrder::with([
      'customer:id,name',
      'service:id,name',
      'serviceType:id,name',
      'product:id,name',
      'business:id,name',
      'route:id,name',
      'planning:id,name',
      'schedule:id,name',
      'user:id,name,role_id',
    ])->get();
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

  public function updateEntryDate($id, $entryDate)
  {
    $serviceOrder = ServiceOrder::findOrFail($id);
    $serviceOrder->entry = $entryDate;
    $serviceOrder->save();
    return $serviceOrder;
  }
}
