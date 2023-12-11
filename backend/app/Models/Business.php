<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    use HasFactory;


    protected $fillable = [
        'business_type'
    ];

    public function product()
    {
        return $this->hasOne(Product::class);
    }
    
}
