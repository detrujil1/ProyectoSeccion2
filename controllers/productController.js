import Product from "../models/product.js";

async function getAll(req, res) {
  try {
    const product = await Product.find({ deletedAt: null }).populate("id");
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Producto no encontrada");
  }
}
async function getById(req, res) {
    try {
        const producById = await Product.find
    } catch (error) {
        console.log(error);
        return res.status(404).json("Producto no encontrada");
    }
    
}




export default {
    getAll: getAll,
  //   getById: getById,
  //   update: update,
  //   destroy: destroy,
  };