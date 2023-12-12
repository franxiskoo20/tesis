<?php

namespace App\Http\Controllers;

use App\Interfaces\RateRepositoryInterface;
use App\Http\Requests\RateRequest;
use Exception;

class RateController extends Controller
{
    protected $rateRepository;

    public function __construct(RateRepositoryInterface $rateRepository)
    {
        $this->rateRepository = $rateRepository;
    }

    public function index()
    {
        try {
            $rates = $this->rateRepository->getAll();
            return response()->json($rates);
        } catch (Exception $e) {
            return response()->json(['errors' => 'Error al obtener las tarifas', 'message' => $e->getMessage()], 500);
        }
    }

    public function store(RateRequest $request)
    {
        try {
            $rate = $this->rateRepository->create($request->validated());
            return response()->json(['rate' => $rate, 'message' => 'Tarifa creada con éxito'], 201);
        } catch (Exception $e) {
            return response()->json(['errors' => 'Error al crear la tarifa', 'message' => $e->getMessage()], 500);
        }
    }

    public function update(RateRequest $request, $id)
    {
        try {
            $rate = $this->rateRepository->update($id, $request->validated());
            return response()->json(['rate' => $rate, 'message' => 'Tarifa actualizada con éxito']);
        } catch (Exception $e) {
            return response()->json(['errors' => 'Error al actualizar la tarifa', 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $this->rateRepository->delete($id);
            return response()->json(['message' => 'Tarifa eliminada con éxito']);
        } catch (Exception $e) {
            return response()->json(['errors' => 'Error al eliminar la tarifa', 'message' => $e->getMessage()], 500);
        }
    }
}
