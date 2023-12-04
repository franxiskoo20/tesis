<?php

namespace App\Repositories;

use App\Interfaces\CustomerRepositoryInterface;
use App\Models\Customer;


class CustomerRepository implements CustomerRepositoryInterface
{

  /**
   * Crea un nuevo cliente.
   * @param array $data
   * @return Customer
   */
  public function create(array $data)
  {
    return Customer::create([
      'name' => $data['name'],
      'description' => $data['description'],
      'status' => $data['status'],
      'logo' => $data['logo'],
      'user_id' => $data['user_id'],
    ]);
  }

  /**
   * Obtiene un cliente por su id.
   * @param int $id
   * @return Customer
   */

  public function getById($id)
  {
    return Customer::findOrFail($id);
  }

  /**
   * Actualiza un cliente.
   *  @param int $id
   * @param array $data
   */
  public function update($id, array $data)
  {
    $customer = Customer::findOrFail($id);
    $customer->update($data);
    return $customer;
  }

  /**
   * Elimina un cliente.
   * @param int $id
   * @return Customer
   */
  public function delete($id)
  {
    $customer = Customer::findOrFail($id);
    $customer->delete();
    return $customer;
  }

  /**
   * Obtiene todos los clientes.
   * @param void
   * @return Collection
   */

  public function getAll()
  {
    return Customer::all();
  }
}
