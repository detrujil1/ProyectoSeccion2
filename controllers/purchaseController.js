import Purchase from "../models/purchaseOrden.js";
// import User from "../models/user.js";

async function getAll(req, res) {
  try {
    
    const purchases = await Purchase.find({ deletedAt: null }).populate("user");
    return res.json(purchases);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Orden no encontrada");
  }
}


async function create(req, res) {
  try {
    // Construye el objeto de compra desde el cuerpo de la solicitud
    const newPurchase = await Purchase.create({
      user: req.body.user,  // ID del usuario que realiza la compra
      products: req.body.products.map(product => ({
        product: product.product, // ID del producto
        quantity: product.quantity // Cantidad del producto
      })),
    });

    return res.status(201).json(newPurchase);
  } catch (error) {
    console.log(error.message || "Error en la creación de la compra");
    return res.status(500).json({ error: "Error en el servidor" });
  }
}


async function getById(req, res) {
  try {
    const purchase = await Purchase.findById(req.params.id);
    return res.json(purchase);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Receta no encontrada");
  }
}

//==============aporte  richard=================
// se crea  orden update controller
async function update(req, res) {
const orderToUpdate = await Purchase.findById(req.params.id);

   if (orderToUpdate !== null) {
     const { user, products, quantity, number  } = req.body;

     orderToUpdate.user = user || orderToUpdate.user;
     orderToUpdate.products = products || orderToUpdate.products;
     orderToUpdate.quantity = quantity || orderToUpdate.quantity;
     orderToUpdate.number = number || orderToUpdate.number;

          await orderToUpdate.save();

     return res.json("La Orden ha sido actualizada");
   } else {
     return res.json("No existe una orden con el ID mencionado");
   }
 }
// orden destry
async function destroy(req, res) {
const orderToDelete = await Purchase.findById(req.params.id);

   orderToDelete.deletedAt = Date.now();
   orderToDelete.save();

   return res.json("La orden se ha eliminado");
 }

export default {
  getAll: getAll,
  getById: getById,
  create: create,
  update: update,
 destroy: destroy,
};
