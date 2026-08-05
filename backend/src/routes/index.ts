import { Router } from "express";
import userRoutes from "./user.routes";
import cropRoutes from "./crop.routes";
const router = Router();
router.use("/users", userRoutes);
router.use("/crops", cropRoutes);
export default router;