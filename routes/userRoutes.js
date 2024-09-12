import express from "express";
import userController from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.get("/api/user", userController.getAll);
userRouter.get("/api/user/:id", userController.getById);
userRouter.post("/api/user",userController.create);
// userRouter.patch("/api/purchase/:id", purchaseController.update);
// userRouter.delete("/api/purchase/:id", purchaseController.destroy);

export default userRouter;