import { Router } from "express";
import { CropController } from "../controllers/CropController";
// import { authMiddleware } from "../middlewares/authMiddleware";

const cropRoutes = Router();
const cropController = new CropController();

cropRoutes.get("/", cropController.list);
cropRoutes.get("/me", /* authMiddleware ,*/ cropController.listMyPosts.bind(cropController));
cropRoutes.get("/:id", cropController.getById.bind(cropController));
cropRoutes.post("/", /* authMiddleware ,*/ cropController.create.bind(cropController));
cropRoutes.put("/:id", /* authMiddleware ,*/ cropController.update.bind(cropController));
cropRoutes.delete("/:id", /* authMiddleware ,*/ cropController.delete.bind(cropController));

export default cropRoutes;