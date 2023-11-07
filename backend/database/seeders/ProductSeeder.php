<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // Poblar la base de datos con 50 productos de prueba
        Product::factory()->count(50)->create();
    }
}
