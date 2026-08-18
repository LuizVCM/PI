import {
  validateUserCreate,
  validateUserUpdate,
} from "../middlewares/index.validate";
import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middlewares/auth-middleware";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/all", userController.listAllWithRelations.bind(userController));
userRoutes.get("/", AuthMiddleware, userController.getInfoUserLogged.bind(userController));
userRoutes.post(
  "/",
  validateUserCreate,
  userController.create.bind(userController)
);
userRoutes.put(
  "/",
  AuthMiddleware,
  validateUserUpdate,
  userController.update.bind(userController)
);
userRoutes.delete("/", AuthMiddleware, userController.delete.bind(userController));
export default userRoutes;