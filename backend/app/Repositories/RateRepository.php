<?php

namespace App\Repositories;

use App\Interfaces\RateRepositoryInterface;
use App\Models\Rate;

class RateRepository implements RateRepositoryInterface
{
  public function getAll()
  {
    return Rate::all();
  }

  public function getById($id)
  {
    return Rate::findOrFail($id);
  }

  public function create(array $data)
  {
    return Rate::create($data);
  }

  public function update($id, array $data)
  {
    $rate = Rate::findOrFail($id);
    $rate->update($data);
    return $rate;
  }

  public function delete($id)
  {
    $rate = Rate::findOrFail($id);
    $rate->delete();
    return $rate;
  }
}
