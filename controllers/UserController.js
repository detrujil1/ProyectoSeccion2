
import { CreateToken } from "../middleware/createToken.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs"

async function login(req, res) {
  const loginInfo = req.body
  try {
    const userInfo = await User.findOne({email: loginInfo.email} )
    if(!userInfo){
      return res.status(500).json("usuario no registrado")
    }
    const isMatch = await bcrypt.compare(loginInfo.password, userInfo.password)
    console.log(loginInfo.password,"login")
    console.log(userInfo.password ,"user")
    console.log(isMatch);
    if (!isMatch){
      return res.status(500).json("contraseña incorrecta")
    }
    const payload = userInfo.toObject()
    delete payload.password
    const data = {...payload}
    
    const token = CreateToken(data)
    return res.status(200).json(token)
  } catch (error) {
    console.log(error);
    return res.status(404).json("usuarios no resgitrado")
  }
  
}

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
    console.log("xxx")
    console.log(error);
    return res.status(404).json("user no encontrada");
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

    return res.json("El usuario ha sido actualizada");
  } else {
    return res.json("No existe el usuario con el ID mencionado");
  }
}

async function deleteUser(req, res) {
  try {
  
      const userToDelete = await User.findById(req.params.id);

      userToDelete.deletedAt = Date.now();
      userToDelete.save();

      return res.json("El usuario se ha eliminado");
  } catch (error) {
     console.log("se cayo el sistemea")
  }
}


export default {
  getAll: getAll,
  getById: getById,
  create: create,
  update: update,
  deleteUser:deleteUser,
  login:login,
};

