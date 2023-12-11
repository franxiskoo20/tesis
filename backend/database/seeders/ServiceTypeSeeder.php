<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ServiceType;

class ServiceTypeSeeder extends Seeder
{
    public function run()
    {
        $serviceTypes = [
            ['name' => 'Despacho', 'description' => 'Servicios relacionados con el envío y despacho de mercancías.'],
            ['name' => 'Movimiento Interno', 'description' => 'Servicios enfocados en la logística y movimiento interno de productos o activos dentro de una organización.'],
            ['name' => 'Recepcion', 'description' => 'Servicios asociados a la recepción de productos, incluyendo control de calidad y manejo inicial.'],
            ['name' => 'Sin Clasificar', 'description' => 'Servicios que no encajan en categorías convencionales o que están pendientes de clasificación.']
        ];

        foreach ($serviceTypes as $type) {
            ServiceType::create($type);
        }
    }
}
