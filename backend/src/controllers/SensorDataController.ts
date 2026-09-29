import { Request, Response, NextFunction } from "express";
import { SensorDataService } from "../services/SensorDataService";
import { CreateSensorDataDTO } from "../schemas/sensor-data.schema";

export class SensorDataController {
  private sensorDataService = new SensorDataService();
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const loggedUser = req.user!.id;
      const data = await this.sensorDataService.getById(id, loggedUser);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
  async getLatestBySensor(req: Request, res: Response, next: NextFunction) {
    try {
      const sensorId = Number(req.params.id);
      const loggedUser = req.user!.id;
      const data = await this.sensorDataService.getLatestBySensor(
        sensorId,
        loggedUser
      );
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
  async listBySensor(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const loggedUser = req.user!.id;
      const data = await this.sensorDataService.listBySensor(id, loggedUser);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const loggedUser = req.user!.id;
      const createDataSensor = req.body as CreateSensorDataDTO;
      const data = await this.sensorDataService.create(
        createDataSensor,
        id,
        loggedUser
      );
      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
}