import express from "express";
import productController from "../controllers/productController";

const router = express.Router();

router.get("/api/location", productController.getAll);
router.get("/api/location:id", productController.getById);
