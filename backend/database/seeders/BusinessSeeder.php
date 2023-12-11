<?php

namespace Database\Seeders;

use App\Models\Business;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BusinessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $businesses = [
            'Otras Cargas',
            'Metal Mecánico',
            'Madera Consolidada',
            'Madera',
            'Fertilizantes',
        ];

        foreach ($businesses as $business) {
            Business::create(['business_type' => $business]);
        }
    }
}
