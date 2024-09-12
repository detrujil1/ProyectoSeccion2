// import dotenv from 'dotenv';
// dotenv.config();

import express from "express";

import purchase from "../models/purchaseOrden.js";
import purchaseOrden from "../controllers/purchaseController.js";
import purchaseController from '../controllers/purchaseController.js';

const purchaseControllerRouter = express.Router();

purchaseControllerRouter.get("/api/purchase", purchaseController.getAll);
// purchaseControllerRouter.get("/api/purchase/:id", purchaseController.getById);

purchaseControllerRouter.post("/api/purchase",purchaseController.create);


// purchaseControllerRouter.patch("/api/purchase/:id", purchaseController.update);
// purchaseControllerRouter.delete("/api/purchase/:id", purchaseController.destroy);

export default purchaseControllerRouter;