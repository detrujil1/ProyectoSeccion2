import express from "express";
import userController from '../controllers/UserController.js';
import { validateToken } from "../middleware/createToken.js";

const userRouter = express.Router();

userRouter.get("/api/user", userController.getAll);
userRouter.get("/api/user/:id", userController.getById);
userRouter.post("/api/user",userController.create);
userRouter.patch("/api/user/:id", validateToken, userController.update);
userRouter.delete("/api/user/:id",validateToken, userController.deleteUser);
userRouter.post("/api/user/login", userController.login);

export default userRouter;


