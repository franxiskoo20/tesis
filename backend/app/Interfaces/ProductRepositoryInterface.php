<?php

namespace App\Interfaces;

interface ProductRepositoryInterface
{
  public function create(array $data);
  public function getById($id);
  public function update($id, array $data);
  public function delete($id);
  public function getAll();
  public function getActive();
}
