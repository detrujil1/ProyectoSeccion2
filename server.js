import connectDB from "./config/database.js";
import express from "express";
import router from "./routes/locationRoutes.js";
const app = express();

app.use(express.json());

connectDB();

//Rutas
app.use(router);

app.listen(3000, () => {
  console.log("El servidor está corriendo en el puerto 3000");
  console.log("http://localhost:3000");
});
