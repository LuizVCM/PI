import { Request, Response, NextFunction } from "express";
import { SensorService } from "../services/SensorService";
import {
  CreateSensorDTO,
  UpdateSensorDTO,
} from "../schemas/sensor.schema";
import { TerritoryService } from "../services/TerritoryService";

export class SensorController {
  private sensorService = new SensorService();
  private territoryService = new TerritoryService();

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const sensors = await this.sensorService.listAll();

      return res.json(sensors);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const sensor = await this.sensorService.getById(id);
      return res.json(sensor);
    } catch (error) {
      next(error);
    }
  }

  async listMySensors(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user!.id;
      const sensors = await this.sensorService.listByUserLogged(id);
      return res.status(200).json(sensors);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const loggedUser = req.user!.id;
      await this.territoryService.listByUserLogged(loggedUser);
      const territoryId = Number(req.params.id);
      const createSensorData = req.body as CreateSensorDTO;
      const sensor = await this.sensorService.create(createSensorData, territoryId);
      return res.status(201).json(sensor);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const loggedUser = req.user!.id;
      const updateSensorData = req.body as UpdateSensorDTO;
      const sensor = await this.sensorService.update(
        id,
        updateSensorData,
        loggedUser
      );
      return res.json(sensor);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const loggedUser = req.user!.id;
      const id = Number(req.params.id);
      await this.sensorService.delete(id, loggedUser);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}