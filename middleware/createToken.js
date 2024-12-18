import jwt from "jsonwebtoken";

// La clave secreta debe provenir de una variable de entorno
const secretKey = process.env.JWT_SECRET || "defaultSecretKey";

// Función para crear un token
export function createToken(data) {
  return jwt.sign(data, secretKey, { expiresIn: "1h" });
}

// Middleware para validar un token
export function validateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Aquí obtenemos el token

  if (!token) {
    return res.status(401).json({ ok: "El token no existe o no está" });
  }

  jwt.verify(token, secretKey, (err, data) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ ok: "El token ha expirado" });
      }
      return res.status(403).json({ ok: "El token es inválido" });
    }

    console.log(data); // Información decodificada del token
    req.user = data; // Puedes almacenar los datos decodificados en `req.user`
    next(); // Pasamos al siguiente middleware
  });
}

