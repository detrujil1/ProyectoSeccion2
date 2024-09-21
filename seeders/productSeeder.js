import database from "../config/database.js";
import Product from "../models/product.js";

database();

async function productSeeder() {

    await Product.create({

        name:"camisa de verano",
        size: "M",
        stock: "100 Uunidades",
        price: "200000",
        category: "sacos"
        brand: "Nike"
        sku: "saco-pluma-nike"

    })
    await Product.create({
        name:"camisa de invierno",
        size: "S",
        stock: "200 unidades",
        price: "300000",
        category: "camisas"
        brand: "Adidas"
        sku: "camisa-nike"

    })
    await Product.create({
        name:"camisa de invierno",
        size: "L",
        stock: "200 unidades",
        price: "300000",
        category: "camisa"
        brand: "Adidas"
        sku: "camisa-nike"

    })
    console.log("sedder en funcionamiento ")
    
}

productSeeder();
