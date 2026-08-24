import { Router } from "express";
import { PlantController } from "../controllers/PlantController";
import { authMiddleware } from "../middlewares/auth-middleware";
import { adminMiddleware } from "../middlewares/admin-middleware";
import { validatePlantCreate, validatePlantUpdate } from "../middlewares/index.validate";

const plantRoutes = Router();
const plantController = new PlantController();

plantRoutes.get("/all", plantController.listAll.bind(plantController));
plantRoutes.get(
  "/me",
  authMiddleware,
  plantController.listByUserLogged.bind(plantController)
);
plantRoutes.get("/seed/:seedId", plantController.listBySeedId.bind(plantController));
plantRoutes.get("/:id", plantController.getById.bind(plantController));
plantRoutes.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validatePlantCreate,
  plantController.create.bind(plantController)
);
plantRoutes.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validatePlantUpdate,
  plantController.update.bind(plantController)
);

export default plantRoutes;