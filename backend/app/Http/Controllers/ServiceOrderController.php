<?php

namespace App\Http\Controllers;

use App\Interfaces\ServiceOrderRepositoryInterface;
use App\Http\Requests\ServiceOrderRequest;
use Exception;

class ServiceOrderController extends Controller
{
    protected $serviceOrderRepository;

    public function __construct(ServiceOrderRepositoryInterface $serviceOrderRepository)
    {
        $this->serviceOrderRepository = $serviceOrderRepository;
    }

    public function index()
    {
        try {
            $serviceOrders = $this->serviceOrderRepository->getAll();
            return response()->json($serviceOrders);
        } catch (Exception $e) {
            return response()->json(['errors' => 'Error al obtener las ordenes de servicio', 'message' => $e->getMessage()], 500);
        }
    }

    public function store(ServiceOrderRequest $request)
    {
        try {
            $serviceOrder = $this->serviceOrderRepository->create($request->validated());
            return response()->json(['serviceOrder' => $serviceOrder, 'message' => 'Orden de servicio creada con éxito'], 201);
        } catch (Exception $e) {
            return response()->json(['errors' => 'Error al crear la orden de servicio', 'message' => $e->getMessage()], 500);
        }
    }

    public function update(ServiceOrderRequest $request, $id)
    {
        try {
            $serviceOrder = $this->serviceOrderRepository->update($id, $request->validated());
            return response()->json(['serviceOrder' => $serviceOrder, 'message' => 'Orden de servicio actualizada con éxito']);
        } catch (Exception $e) {
            return response()->json(['errors' => 'Error al actualizar la orden de servicio', 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $this->serviceOrderRepository->delete($id);
            return response()->json(['message' => 'Orden de servicio eliminada con éxito']);
        } catch (Exception $e) {
            return response()->json(['errors' => 'Error al eliminar la orden de servicio', 'message' => $e->getMessage()], 500);
        }
    }
    public function updateEntryDate($id)
    {
        try {
            $serviceOrder = $this->serviceOrderRepository->updateEntryDate($id, now());
            return response()->json(['serviceOrder' => $serviceOrder, 'message' => 'Fecha de entrada de la orden de servicio actualizada con éxito']);
        } catch (Exception $e) {
            return response()->json(['errors' => 'Error al actualizar la fecha de entrada de la orden de servicio', 'message' => $e->getMessage()], 500);
        }
    }
}
