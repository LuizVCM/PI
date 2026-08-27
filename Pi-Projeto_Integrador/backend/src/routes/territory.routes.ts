import { Router } from "express";
import { TerritoryController } from "../controllers/TerritoryController";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import { validateTerritoryCreate, validateTerritoryUpdate } from "../middlewares/index.validate";

const territoryRoutes = Router();
const territoryController = new TerritoryController();

territoryRoutes.get("/", territoryController.listAll.bind(territoryController));
territoryRoutes.get(
  "/me",
  AuthMiddleware,
  territoryController.listMyTerritories.bind(territoryController)
);
territoryRoutes.get("/:id", territoryController.getById.bind(territoryController));
territoryRoutes.post(
  "/",
  AuthMiddleware,
  validateTerritoryCreate,
  territoryController.create.bind(territoryController)
);
territoryRoutes.put(
  "/:id",
  AuthMiddleware,
  validateTerritoryUpdate,
  territoryController.update.bind(territoryController)
);
territoryRoutes.delete(
  "/:id",
  AuthMiddleware,
  territoryController.delete.bind(territoryController)
);

export default territoryRoutes;