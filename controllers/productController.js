import Product from "../models/product.js";

async function getAll(req, res) {
  try {
    const product = await Product.find({ deletedAt: null }) //.populate("id");
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Producto no encontrada");
  }
}

// ==============Aporte  abre Richard Torres=======================
//* Controlador de Product (Faltan getByIdok, createok, update y destroy)
//create
async function create(req, res) {
  try {
    const newProduct = await Product.create({
      name: req.body.name,
      size: req.body.size,
      stock: req.body.stock,
      price: req.body.price,
      category: req.body.category,
      brand: req.body.brand,
      sku: req.body.sku,
      description: req.body.description,  // Incluye la descripción si está presente
      images: req.body.images  // Incluye imágenes si están presentes
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    console.log(error.message || "Error en la creación del producto");
    return res.status(500).json({ error: "Error en el servidor" });
  }
}


//getby id

async function getById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Producto no encontrada");
  }
}
// update(patch)
async function update(req, res) {
  const productToUpdate = await Product.findById(req.params.id);

  if (productToUpdate !== null) {
    const { name, size, stock, price, category, brand, sku, description, images } = req.body;

    productToUpdate.name = name || productToUpdate.name;
    productToUpdate.size = size || productToUpdate.size;
    productToUpdate.stock = stock || productToUpdate.stock;
    productToUpdate.price = price || productToUpdate.price;
    productToUpdate.category = category || productToUpdate.category;
    productToUpdate.brand = brand || productToUpdate.brand;
    productToUpdate.sku = sku || productToUpdate.sku;
    productToUpdate.description = description || productToUpdate.description;  // Actualiza la descripción si está
    productToUpdate.images = images || productToUpdate.images;  // Actualiza imágenes si están

    await productToUpdate.save();

    return res.json("El producto ha sido actualizado");
  } else {
    return res.status(404).json("No existe un producto con el ID mencionado");
  }
}

//conrolador destroy-delete
async function deleteProduct(req, res) {
  try {
    const productToDelete = await Product.findById(req.params.id);

    if (!productToDelete) {
      return res.status(404).json("No existe un producto con el ID mencionado");
    }

    productToDelete.deletedAt = Date.now();
    await productToDelete.save();

    return res.json("el producto se ha eliminado");
  } catch (error) {
    console.log("se cayo el sistmea");
    return res.status(500).json("Error al eliminar producto");
  }
}

// ==============cierra abre Richard Torres=======================

export default {
    getAll: getAll,
  getById: getById,
  update: update,
  deleteProduct: deleteProduct,
  create: create

  };