import { Router } from "express";
import { SensorDataController } from "../controllers/SensorDataController";
import { authMiddleware } from "../middlewares/auth-middleware";
import { validateSensorDataCreate } from "../middlewares/index.validate";

const sensorDataRoutes = Router();
const sensorDataController = new SensorDataController();

sensorDataRoutes.get(
  "/sensor/:id",
  authMiddleware,
  sensorDataController.listBySensor.bind(sensorDataController)
);
sensorDataRoutes.get(
  "/sensor/:id/latest",
  authMiddleware,
  sensorDataController.getLatestBySensor.bind(sensorDataController)
);
sensorDataRoutes.post(
  "/sensor/:id",
  authMiddleware,
  validateSensorDataCreate,
  sensorDataController.create.bind(sensorDataController)
);
sensorDataRoutes.get(
  "/:id",
  authMiddleware,
  sensorDataController.getById.bind(sensorDataController)
);

export default sensorDataRoutes;
