import express from "express";
import userController from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.get("/api/user", userController.getAll);
userRouter.get("/api/user/:id", userController.getById);
userRouter.post("/api/user",userController.create);
userRouter.patch("/api/user/:id", userController.update);
userRouter.delete("/api/user/:id", userController.deleteUser);

export default userRouter;
