import express from "express";
import adminController from '../controllers/admincontroller.js';
import { validateToken } from "../middleware/createToken.js";

const adminRouter = express.Router();

adminRouter.get("/api/admin", adminController.getAll);
adminRouter.get("/api/admin/:id", adminController.getById);
adminRouter.post("/api/admin",adminController.create);
adminRouter.patch("/api/admin/:id", validateToken, adminController.update);
adminRouter.delete("/api/admin/:id",validateToken, adminController.deleteAdmin);
adminRouter.post("/api/admin/login", adminController.login);

export default adminRouter;
