import database from "../config/database.js";
import Product from "../models/product.js";



database();

async function productSeeder() {
    // producto1
    await Product.create({
        name: "camisa de verano",
        size: "M",
        stock: "101 unidades",
        price: 250000,
        category: "sacos",
        brand: "Nike",
        sku: "saco-pluma-nike",
        description: "Camisa de verano cómoda y ligera",  // Incluye la descripción
        images: ["https://www.biowebcolsacor.online/wp-content/uploads/2024/10/Rectangle-4-1.png", "https://www.biowebcolsacor.online/wp-content/uploads/2024/10/Rectangle-4-2.png"]  // Incluye las imágenes del producto
    });
    // producto2
    await Product.create({
        name: "camisa de Nieve Suave",
        size: "S",
        stock: "200 unidades",
        price: 300000,
        category: "camisas",
        brand: "Adidas",
        sku: "camisa-de-Nieve-Suave",
        description: "Camisa ideal para el frío",  // Incluye la descripción
        images: ["https://www.biowebcolsacor.online/wp-content/uploads/2024/10/Rectangle-4-3.png", "https://www.biowebcolsacor.online/wp-content/uploads/2024/10/Rectangle-4-4.png"]  // Incluye las imágenes del producto
    });
        // producto3
    await Product.create({
        name: "camisa Brisa Marina",
        size: "L",
        stock: "300 unidades",
        price: 220000,
        category: "sacos",
        brand: "Nike",
        sku: "camisa-Brisa-Marina",
        description: "Camisa de verano cómoda y ligera",  // Incluye la descripción
        images: ["https://www.biowebcolsacor.online/wp-content/uploads/2024/10/Rectangle-4-5.png", "https://www.biowebcolsacor.online/wp-content/uploads/2024/10/Rectangle-4-6.png"]  // Incluye las imágenes del producto
    });

  // producto4
  await Product.create({
    name: "camisa Refugio Invernal",
    size: "M",
    stock: "400 unidades",
    price: 310000,
    category: "sacos",
    brand: "Nike",
    sku: "camisa-Refugio-Invernal",
    description: "camisa Refugio Invernal cómoda y ligera",  // Incluye la descripción
    images: ["https://www.biowebcolsacor.online/wp-content/uploads/2024/10/Rectangle-4-7.png", "https://www.biowebcolsacor.online/wp-content/uploads/2024/10/Rectangle-4-8.png"]  // Incluye las imágenes del producto
});

  // producto5
  await Product.create({
    name: "camisa Rayos de Sol",
    size: "L",
    stock: "500 unidades",
    price: 250000,
    category: "sacos",
    brand: "Nike",
    sku: "saco-pluma-nike",
    description: "camisa Rayos de Sol cómoda y ligera",  // Incluye la descripción
    images: ["https://www.biowebcolsacor.online/wp-content/uploads/2024/10/Rectangle-4-9.png", "https://www.biowebcolsacor.online/wp-content/uploads/2024/10/Rectangle-4-10.png"]  // Incluye las imágenes del producto
});

  // producto6
  await Product.create({
    name: "camisa Olas",
    size: "S",
    stock: "600 unidades",
    price: 260000,
    category: "sacos",
    brand: "Nike",
    sku: "camisa-Olas",
    description: "camisa Olas cómoda y ligera",  // Incluye la descripción
    images: ["https://www.biowebcolsacor.online/wp-content/uploads/2024/10/Rectangle-4-11.png", "https://www.biowebcolsacor.online/wp-content/uploads/2024/10/Rectangle-4.png"]  // Incluye las imágenes del producto
});


    console.log("Seeder de productos en funcionamiento");
}

productSeeder();