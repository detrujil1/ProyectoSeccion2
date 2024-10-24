import database from "../config/database.js";
import Product from "../models/product.js";

database();

async function productSeeder() {
    await Product.create({
        name: "camisa de verano",
        size: "M",
        stock: "100 unidades",
        price: 200000,
        category: "sacos",
        brand: "Nike",
        sku: "saco-pluma-nike",
        description: "Camisa de verano cómoda y ligera",  // Incluye la descripción
        images: ["https://www.biowebcolsacor.online/wp-content/uploads/2024/10/Rectangle-4-6.png"]  // Incluye las imágenes del producto
    });

    await Product.create({
        name: "camisa de invierno",
        size: "S",
        stock: "200 unidades",
        price: 300000,
        category: "camisas",
        brand: "Adidas",
        sku: "camisa-invierno-adidas",
        description: "Camisa ideal para el frío",  // Incluye la descripción
        images: ["https://www.biowebcolsacor.online/wp-content/uploads/2024/10/Rectangle-4-7.png"]  // Incluye las imágenes del producto
    });

    console.log("Seeder de productos en funcionamiento");
}

productSeeder();
