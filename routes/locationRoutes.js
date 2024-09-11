import express from "express";
import locationController from "../controllers/locationController.js";

const router = express.Router();

router.get("/api/location", locationController.getAll);
// router.get("/api/location/:id", locationController.getById);
router.post("/api/location", locationController.create);
// router.patch("/api/location/:id", locationController.update);
// router.delete("/api/location/:id", locationController.destroy);

export default router;