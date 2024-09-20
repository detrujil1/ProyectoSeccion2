import express from "express";
import productController from "../controllers/productController.js";

const ProductRouter = express.Router();

ProductRouter.get("/api/Product", productController.getAll);

// creacion ruta create newproduct

ProductRouter.post("/api/product", productController.create);//crate
ProductRouter.get("/api/Product/:id", productController.getById);//getById
ProductRouter.patch("/api/Product/:id", productController.update);//update
ProductRouter.delete("/api/Product/:id", productController.deleteProduct);//delete

//===========richard================

//exportar 


export default ProductRouter
