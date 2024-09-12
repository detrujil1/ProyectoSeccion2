
import User from "../models/user.js";

async function getAll(req, res) {
  try {
    const user = await User.find({ deletedAt: null }).populate("id");
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(404).json("usuarios no encontrados ");
  }
}

async function getById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Receta no encontrada");
  }
}

async function create(req, res) {
    try {
      // Construye el objeto de compra desde el cuerpo de la solicitud
      const newUser = await User.create({
        id: req.body.id,  // ID del usuario que realiza la compra
        name : req.body.name,
        lastName: req.body.lastName,
        email:req.body.email,
        password:req.body.password
      });
  
      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error.message || "Error en la creación del usuario");
      return res.status(500).json({ error: "Error en el servidor" });
    }
  }


// async function update(req, res) {
//   const recipeToUpdate = await user.findById(req.params.id);

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
//   const recipeToDelete = await user.findById(req.params.id);

//   recipeToDelete.deletedAt = Date.now();
//   recipeToDelete.save();

//   return res.json("La receta se ha eliminado");
// }

export default {
  getAll: getAll,
  getById: getById,
  create: create,
//   update: update,
//   destroy: destroy,
};
