<?php

namespace App\Http\Controllers;

use App\Interfaces\CustomerRepositoryInterface;
use App\Http\Requests\CustomerRequest;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;


class CustomerController extends Controller
{

    protected $customerRepository;


    public function __construct(CustomerRepositoryInterface $customerRepository)
    {
        $this->customerRepository = $customerRepository;
    }


    public function index()
    {
        try {
            $customers = $this->customerRepository->getAll();
            return response()->json($customers);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(CustomerRequest $request)
    {
        try {
            $this->customerRepository->create($request->validated());
            return response()->json(['message' => 'Cliente creado con éxito'], 201);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error al crear el cliente', 'message' => $e->getMessage()], 500);
        }
    }


    public function show($id)
    {
        try {
            $customer = $this->customerRepository->getById($id);
            return response()->json($customer);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Cliente no encontrado'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error al obtener el cliente'], 500);
        }
    }

    public function update(CustomerRequest $request, $id)
    {
        try {
            $data = $request->validated();
            $customer = $this->customerRepository->update($id, $data);
            return response()->json(['customer' => $customer, 'message' => 'Cliente actualizado con éxito']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error al actualizar el usuario'], 500);
        }
    }


    public function destroy($id)
    {
        try {
            $this->customerRepository->delete($id);
            return response()->json(['message' => 'Cliente eliminado con éxito']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error al eliminar el cliente'], 500);
        }
    }
}
