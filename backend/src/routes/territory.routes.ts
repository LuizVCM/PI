import { Router } from "express";
import { TerritoryController } from "../controllers/TerritoryController";
import { AuthMiddleware } from "../middlewares/auth-middleware";

const territoryRoutes = Router();
const territoryController = new TerritoryController();

territoryRoutes.get("/", territoryController.list);
territoryRoutes.get(
  "/me",
  AuthMiddleware,
  territoryController.listMyTerritories.bind(territoryController)
);
territoryRoutes.get("/:id", territoryController.getById.bind(territoryController));
territoryRoutes.post(
  "/",
  AuthMiddleware,
  territoryController.create.bind(territoryController)
);
territoryRoutes.put(
  "/:id",
  AuthMiddleware,
  territoryController.update.bind(territoryController)
);
territoryRoutes.delete(
  "/:id",
  AuthMiddleware,
  territoryController.delete.bind(territoryController)
);

export default territoryRoutes;