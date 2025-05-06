<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ficha extends Model
{
    protected $table = 'ficha';
    protected $fillable = ['nombre', 'descripcion', 'imagen'];

}
