import express from "express";
import productController from "../controllers/productController.js";

const ProductRouter = express.Router();

ProductRouter.get("/api/Product", productController.getAll);


//===========richard
// ProductRouter.get("/api/Product:id", productController.getById);
// creacion ruta create newproduct
ProductRouter.post("/api/product", productController.create);//crate
ProductRouter.get("/api/Product/:id", productController.getById);//getById
ProductRouter.patch("/api/Product/:id", productController.update);//update
ProductRouter.delete("/api/Product/:id", productController.deleteProduct);//delete


//exportar 
export default ProductRouter