import { Router } from "express";
import userRoutes from "./user.routes";
import cropRoutes from "./crop.routes";
import authRoutes from "./auth.routes";
const router = Router();
router.use("/users", userRoutes);
router.use("/crops", cropRoutes);
router.use("/auth", authRoutes); // login, logout e checar senha
export default router;