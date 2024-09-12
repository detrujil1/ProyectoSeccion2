import express from "express";
import productController from "../controllers/productController.js";

const ProductRouter = express.Router();

ProductRouter.get("/api/Product", productController.getAll);
// ProductRouter.get("/api/Product:id", productController.getById);

export default ProductRouter
