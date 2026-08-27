import { Request, Response, NextFunction } from "express";
import { DataSensorService } from "../services/DataSensorService";

export class DataSensorController {
  private dataSensorService = new DataSensorService();

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.dataSensorService.listAll();

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const data = await this.dataSensorService.getById(id);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async listBySensor(req: Request, res: Response, next: NextFunction) {
    try {
      const sensorId = Number(req.params.sensorId);

      const data = await this.dataSensorService.listBySensor(sensorId);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const sensorId = Number(req.params.sensorId);

      const data = await this.dataSensorService.create(
        req.body,
        sensorId
      );

      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
}