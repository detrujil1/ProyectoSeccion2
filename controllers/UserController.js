
import User from "../models/user.js";

async function getAll(req, res) {
  try {
    const user = await User.find({ deletedAt: null });
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


async function update(req, res) {
  const userToUpdate = await User.findById(req.params.id);

  if (userToUpdate !== null) {
    const { document, name, lastName, email, password } = req.body;

    userToUpdate.document = document || userToUpdate.document;
    userToUpdate.name = name || userToUpdate.name;
    userToUpdate.lastName = lastName || userToUpdate.lastName;
    userToUpdate.email = email || userToUpdate.email;
    userToUpdate.password = password || userToUpdate.password;

    await userToUpdate.save();

    return res.json("La receta ha sido actualizada");
  } else {
    return res.json("No existe una receta con el ID mencionado");
  }
}

async function deleteUser(req, res) {
  try {
  
      const userToDelete = await User.findById(req.params.id);

      userToDelete.deletedAt = Date.now();
      userToDelete.save();

      return res.json("La receta se ha eliminado");
  } catch (error) {
     console.log("se cayo el sistmea")
  }
}


export default {
  getAll: getAll,
  getById: getById,
  create: create,
  update: update,
  deleteUser: deleteUser,
};
