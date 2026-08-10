import { Router } from "express";
import { CropController } from "../controllers/CropController";
import { AuthMiddleware } from "../middlewares/auth-middleware";

const cropRoutes = Router();
const cropController = new CropController();

cropRoutes.get("/", cropController.list);
cropRoutes.get(
  "/me",
  AuthMiddleware,
  cropController.listMyCrops.bind(cropController)
);
cropRoutes.get("/:id", cropController.getById.bind(cropController));
cropRoutes.post(
  "/",
  AuthMiddleware,
  cropController.create.bind(cropController)
);
cropRoutes.put(
  "/:id",
  AuthMiddleware,
  cropController.update.bind(cropController)
);
cropRoutes.delete(
  "/:id",
  AuthMiddleware,
  cropController.delete.bind(cropController)
);

export default cropRoutes;