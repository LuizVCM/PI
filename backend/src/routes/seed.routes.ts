import { Router } from "express";
import { SeedController } from "../controllers/SeedController";
import { authMiddleware } from "../middlewares/auth-middleware";
import { adminMiddleware } from "../middlewares/admin-middleware";
import { validateSeedCreate } from "../middlewares/index.validate";

const seedRoutes = Router();
const seedController = new SeedController();

seedRoutes.get(
  "/all",
  authMiddleware,
  adminMiddleware,
  seedController.listAll.bind(seedController)
);
seedRoutes.get(
  "/:id",
  authMiddleware,
  seedController.getById.bind(seedController)
);
seedRoutes.get(
  "/me",
  authMiddleware,
  seedController.listMySeeds.bind(seedController)
);
seedRoutes.post(
  "/",
  authMiddleware,
  validateSeedCreate,
  seedController.create.bind(seedController)
);
seedRoutes.put("/", authMiddleware, seedController.update.bind(seedController));

export default seedRoutes;
