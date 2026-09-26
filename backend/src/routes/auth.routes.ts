import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/auth-middleware";
import { validateUserLogin } from "../middlewares/index.validate";
const authRoutes = Router();
const authController = new AuthController();
authRoutes.post(
  "/login",
  validateUserLogin,
  authController.login.bind(authController)
);
authRoutes.post(
  "/logout",
  authMiddleware,
  authController.logout.bind(authController)
);
authRoutes.post(
  "/checkpass",
  authMiddleware,
  authController.checkUserPassword.bind(authController)
);
export default authRoutes;
