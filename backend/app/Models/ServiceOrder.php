<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'planning_id',
        'schedule_id',
        'client_id',
        'service_type_id',
        'service_id',
        'product_id',
        'business_id',
        'route_id',
        'container',
        'truck_plate',
        'entry',
        'exit',
        'status',
        'status_date',
        'rescheduled_os_id',
        'comment'
    ];
}

