import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import territoryRoutes from "./territory.routes";
import cropRoutes from "./crop.routes";
const router = Router();
router.use("/auth", authRoutes); // login, logout e checar senha
router.use("/crops", cropRoutes);
router.use("/users", userRoutes);
router.use("/territories", territoryRoutes);
export default router;