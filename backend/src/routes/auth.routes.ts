import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthMiddleware } from "../middlewares/auth-middleware";
const authRoutes = Router();
const authController = new AuthController();
authRoutes.post("/login", authController.login.bind(authController));
authRoutes.post(
  "/logout",
  AuthMiddleware,
  authController.logout.bind(authController)
);
authRoutes.post(
  "/checkpass",
  AuthMiddleware,
  authController.checkUserPassword.bind(authController)
);
export default authRoutes;