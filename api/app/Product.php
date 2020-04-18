<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function cashier()
    {
        return $this->belongsTo('App\Cashier');
    }

    public function category()
    {
        return $this->belongsTo('App\Category');
    }
}
