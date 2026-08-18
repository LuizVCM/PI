import { Router } from "express";
import { CropController } from "../controllers/CropController";
import { authMiddleware } from "../middlewares/auth-middleware";
import { validateCropCreate } from "../middlewares/index.validate";

const cropRoutes = Router();
const cropController = new CropController();

cropRoutes.get("/", cropController.listAll.bind(cropController));
cropRoutes.post("/:id", authMiddleware, validateCropCreate, cropController.create.bind(cropController));

export default cropRoutes;