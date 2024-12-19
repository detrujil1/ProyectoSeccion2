import { createToken } from "../middleware/createToken.js";
import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";

async function login(req, res) {
  const loginInfo = req.body;
  try {
    const adminInfo = await Admin.findOne({ email: loginInfo.email });
    const isMatch = await bcrypt.compare(
      loginInfo.password,
      adminInfo.password
    );
    console.log(isMatch);
    if (!isMatch) {
      return res.status(500).json("contraseña incorrecta");
    }
    const payload = adminInfo.toObject();
    delete payload.password;
    const data = { ...payload };

    const token = createToken(data);
    return res.status(200).json(token);
  } catch (error) {
    console.log(error);
    return res.status(404).json("administrador no encontrado");
  }
}

//'Aporte Duvan crear administrador, poder editar el administrador y eliminar, crear reglas de visualización del administrador y edpoint

async function getAll(req, res) {
  try {
    const admins = await Admin.find({ deletedAt: null });
    return res.json(admins);
  } catch (error) {
    console.log(error);
    return res.status(404).json("admins no encontrados ");
  }
}

async function getById(req, res) {
  try {
    const admin = await Admin.findById(req.params.id);
    return res.json(admin);
  } catch (error) {
    console.log(error);
    return res.status(404).json("admin no encontrada");
  }
}

async function create(req, res) {
  try {
    // Construye el objeto de compra desde el cuerpo de la solicitud
    const newAdmin = await Admin.create({
      document: req.body.document,
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).json(newAdmin);
  } catch (error) {
    console.log(error.message || "Error en la creación del admin");
    return res.status(500).json({ error: "Error en el servidor" });
  }
}

async function update(req, res) {
  const adminToUpdate = await Admin.findById(req.params.id);

  if (adminToUpdate !== null) {
    const { document, name, lastName, email, password } = req.body;

    adminToUpdate.document = document || adminToUpdate.document;
    adminToUpdate.name = name || adminToUpdate.name;
    adminToUpdate.lastName = lastName || adminToUpdate.lastName;
    adminToUpdate.email = email || adminToUpdate.email;
    adminToUpdate.password = password || adminToUpdate.password;

    await adminToUpdate.save();

    return res.json("El administrador ha sido actualizada");
  } else {
    return res.json("No existe el administrador con el ID mencionado");
  }
}

async function deleteAdmin(req, res) {
  try {
    const adminToDelete = await Admin.findById(req.params.id);

    adminToDelete.deletedAt = Date.now();
    adminToDelete.save();

    return res.json("El administrador se ha eliminado");
  } catch (error) {
    console.log("se cayo el sistema");
  }
}

export default {
  getAll: getAll,
  getById: getById,
  create: create,
  update: update,
  deleteAdmin: deleteAdmin,
  login: login,
};
