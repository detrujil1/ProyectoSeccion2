import location from "../models/location.js";
import User from "../models/user.js";

async function getAll(req, res) {
  try {
    const locations = await location.find({ deletedAt: null });
    return res.json(locations);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Direccion no encontrada");
  }
}

async function getById(req, res) {
  try {
    const Location = await location.findById(req.params.id);
    return res.json(Location);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Direccion no encontrada");
  }
}

async function create(req, res) {
  try {
    const newLocation = await location.create({
        city:req.body.city,
        zipCode:req.body.zipCode,
        address:req.body.address
    });
    return res.status(201).json(newLocation);
  } catch (error) {
    console.log(error.errors.id?.properties.message);
    return res.status(501).json("Error en el servidor");
  }
}

async function update(req, res) {
  const locationToUpdate = await location.findById(req.params.id);

  if (locationToUpdate !== null) {
    const { city, zipCode, address } = req.body;

    locationToUpdate.city = city || locationToUpdate.city;
    locationToUpdate.zipCode = zipCode || locationToUpdate.zipCode;
    locationToUpdate.address = address || locationToUpdate.address;

    await locationToUpdate.save();

    return res.json("La direccion ha sido actualizada");
  } else {
    return res.json("No existe una receta con el ID mencionado");
  }
}

async function destroy(req, res) {
  const recipeToDelete = await location.findById(req.params.id);

  recipeToDelete.deletedAt = Date.now();
  recipeToDelete.save();

  return res.json("La receta se ha eliminado");
}

export default {
  getAll: getAll,
  getById: getById,
  create: create,
  update: update,
  destroy: destroy,
};
