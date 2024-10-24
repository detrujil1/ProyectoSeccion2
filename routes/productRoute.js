import express from "express";
import productController from "../controllers/productController.js";

const ProductRouter = express.Router();

ProductRouter.get("/api/products", productController.getAll);

// creacion ruta create newproduct

ProductRouter.post("/api/product", productController.create);//crate
ProductRouter.get("/api/product/:id", productController.getById);//getById
ProductRouter.patch("/api/product/:id", productController.update);//update
ProductRouter.delete("/api/product/:id", productController.deleteProduct);//delete



//exportar 


export default ProductRouter
