import jwt  from "jsonwebtoken";

const secret = "contra1234"

export function CreateToken(data){
   return jwt.sign(data, secret, {expiresIn:"1h"})
}