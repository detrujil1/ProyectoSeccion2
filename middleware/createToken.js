import jwt  from "jsonwebtoken";

const secretKey = "contra1234"

export function CreateToken(data){
   return jwt.sign(data, secretKey, {expiresIn:"1h"})
}


export function validateToken(req, res, next){
   const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Aquí obtenemos el token

  if (token == null) return res.status(401).json({ ok: "El token no existe o no está" });


  jwt.verify(token, secretKey, (err, data) => {
    if (err) {
      return res.status(403).json({ ok: "El token es inválido" }); 
    }

    console.log(data); 

    req.user = data; 
    next(); 
  });
}
