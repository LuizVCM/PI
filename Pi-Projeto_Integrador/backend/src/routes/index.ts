import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import territoryRoutes from "./territory.routes";
const router = Router();
router.use("/users", userRoutes);
router.use("/territories", territoryRoutes);
router.use("/auth", authRoutes); // login, logout e checar senha
export default router;