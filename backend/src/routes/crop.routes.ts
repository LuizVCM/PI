import { Router } from "express";
import { CropController } from "../controllers/CropController";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import { validateCropCreate } from "../middlewares/index.validate";

const cropRoutes = Router();
const cropController = new CropController();

cropRoutes.get("/", cropController.listAll.bind(cropController));
cropRoutes.post("/:id", AuthMiddleware, validateCropCreate, cropController.create.bind(cropController));

export default cropRoutes;