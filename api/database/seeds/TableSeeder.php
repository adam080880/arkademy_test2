<?php

use Illuminate\Database\Seeder;

use App\Category;
use App\Product;
use App\Cashier;

class TableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $category = new Category;
        $category->name = "Food";
        $category->save();

        $category = new Category;
        $category->name = "Drink";
        $category->save();

        $cashier = new Cashier;
        $cashier->name = "Pevita Pearce";
        $cashier->save();

        $cashier = new Cashier;
        $cashier->name = "Raisa Andriana";
        $cashier->save();

        $cashier = new Cashier;
        $cashier->name = "Muhamad Adam";
        $cashier->save();

        $product = new Product;
        $product->name = "Latte";
        $product->price = "10000";
        $product->category_id = 2;
        $product->cashier_id = 1;
        $product->save();

        $product = new Product;
        $product->name = "Cake";
        $product->price = "20000";
        $product->category_id = 1;
        $product->cashier_id = 2;
        $product->save();

        $product = new Product;
        $product->name = "Bakso";
        $product->price = "45000"; //banyak amat hampir gocap XD
        $product->category_id = 1;
        $product->cashier_id = 3;
        $product->save();
    }
}
