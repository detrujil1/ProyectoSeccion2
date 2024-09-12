import Purchase from "../models/purchaseOrden.js";
import User from "../models/user.js";

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


// async function getById(req, res) {
//   try {
//     const purchase = await Purchase.findById(req.params.id);
//     return res.json(purchase);
//   } catch (error) {
//     console.log(error);
//     return res.status(404).json("Receta no encontrada");
//   }
// }



// async function update(req, res) {
//   const recipeToUpdate = await Purchase.findById(req.params.id);

//   if (recipeToUpdate !== null) {
//     const { title, description, preparation, instructions } = req.body;

//     recipeToUpdate.title = title || recipeToUpdate.title;
//     recipeToUpdate.description = description || recipeToUpdate.description;
//     recipeToUpdate.preparation = preparation || recipeToUpdate.preparation;
//     recipeToUpdate.instructions = instructions || recipeToUpdate.instructions;

//     await recipeToUpdate.save();

//     return res.json("La receta ha sido actualizada");
//   } else {
//     return res.json("No existe una receta con el ID mencionado");
//   }
// }

// async function destroy(req, res) {
//   const recipeToDelete = await Purchase.findById(req.params.id);

//   recipeToDelete.deletedAt = Date.now();
//   recipeToDelete.save();

//   return res.json("La receta se ha eliminado");
// }

export default {
  getAll: getAll,
//   getById: getById,
  create: create,
//   update: update,
//   destroy: destroy,
};
