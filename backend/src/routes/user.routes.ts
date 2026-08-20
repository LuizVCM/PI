import {
  validateUserCreate,
  validateUserUpdate,
} from "../middlewares/index.validate";
import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/auth-middleware";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/all", userController.listAllWithRelations.bind(userController));
userRoutes.get("/me", authMiddleware, userController.getInfoUserLogged.bind(userController));
userRoutes.post(
  "/",
  validateUserCreate,
  userController.create.bind(userController)
);
userRoutes.put(
  "/",
  authMiddleware,
  validateUserUpdate,
  userController.update.bind(userController)
);
userRoutes.delete("/", authMiddleware, userController.delete.bind(userController));
export default userRoutes;