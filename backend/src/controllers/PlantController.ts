import { Request, Response, NextFunction } from "express";
import { PlantService } from "../services/PlantService";
import {
  CreatePlantDTO,
  UpdatePlantDTO,
  createPlantSchema,
  updatePlantSchema,
} from "../schemas/plant.schema";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export class PlantaController {
  private plantService = new PlantService();

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const plants = await this.plantService.listAll();

      return res.json(plants);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const plant = await this.plantService.getById(id);

      return res.json(plant);
    } catch (error) {
      next(error);
    }
  }

  async listMyPlants(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new UnauthorizedError("não autenticado");
      }

      const plants = await this.plantService.listMyPlants(req.user.id);

      return res.status(200).json(plants);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const plantData: CreatePlantDTO = createPlantSchema.parse(req.body);

      if (!req.user?.id) {
        throw new UnauthorizedError("não autenticado");
      }

      const { sementeId } = req.body;

      const plant = await this.plantService.create(
        plantData,
        sementeId,

        req.user.id
      );

      return res.status(201).json(plant);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const plantData: UpdatePlantDTO = updatePlantSchema.parse(req.body);

      if (!req.user?.id) {
        throw new UnauthorizedError("não autenticado");
      }

      const { sementeId } = req.body;

      const plant = await this.plantService.update(
        id,
        plantData,
        req.user.id,
        sementeId
      );

      return res.json(plant);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      await this.plantService.delete(id);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}