<?php

namespace App\Interfaces;

use App\Models\Rate;

interface RateRepositoryInterface
{
  public function getAll();
  public function getById($id);
  public function create(array $data);
  public function update($id, array $data);
  public function delete($id);
}
