import connectDB from "./config/database.js";
import express from "express";
import router from "./routes/locationRoutes.js";
import ProductRouter from "./routes/productRoute.js";
import purchaseControllerRouter from "./routes/purchaseOrdenRoutes.js"
import userRouter from "./routes/userRoutes.js"
import adminRouter from "./routes/adminRoutes.js";

const app = express();

app.use(express.json());

connectDB();

//Rutas
app.use(router);
app.use(ProductRouter);
app.use(purchaseControllerRouter);
app.use(userRouter)
app.use(adminRouter)


app.listen(3000, () => {
  console.log("El servidor está corriendo en el puerto 3000");
  console.log("http://localhost:3000");
});
app.get("/", (req, res) => {res.send("Hola desde la raíz")})