import Router from "express";
import register from "../controllers/userControllers.js";

const router = Router();

router.post("/users", register);

export default router

