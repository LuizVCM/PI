import { Request, Response, NextFunction } from "express";
import { SensorService } from "../services/SensorService";
import { UserService } from "../services/UserService";
import {
  CreateSensorDTO,
  createSensorSchema,
  UpdateSensorDTO,
  updateSensorSchema,
} from "../schemas/sensor.schema";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { TerritoryService } from "../services/TerritoryService";
import { NotFoundError } from "../errors/NotFoundError";
import { AuthorizationService } from "../services/AuthorizationService";

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
      if (!req.user?.id) {
        throw new UnauthorizedError("não autenticado");
      }

      const sensors = await this.sensorService.listByUserLogged(req.user.id);

      return res.status(200).json(sensors);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new UnauthorizedError("não autenticado");
      }
      const loggedUserId = req.user.id;
      const territoryId = Number(req.params.id);
      const territories = await this.territoryService.listByUserLogged(loggedUserId);

      if (!territories) {
        throw new NotFoundError(
          "territórios",
          "usuário não possui territórios cadastrados"
        );
      }

      territories.forEach((item) =>
        AuthorizationService.ensureOwnership(item, loggedUserId, "territórios")
      );

      const sensorData: CreateSensorDTO = createSensorSchema.parse(req.body);

      const sensor = await this.sensorService.create(sensorData, territoryId);

      return res.status(201).json(sensor);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      if (!req.user?.id) {
        throw new UnauthorizedError("não autenticado");
      }

      const sensorData: UpdateSensorDTO = updateSensorSchema.parse(req.body);

      const sensor = await this.sensorService.update(
        id,
        sensorData,
        req.user.id
      );

      return res.json(sensor);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new UnauthorizedError("não autenticado");
      }
      const loggedUserId = req.user.id;
      const id = Number(req.params.id);

      await this.sensorService.delete(id, loggedUserId);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}