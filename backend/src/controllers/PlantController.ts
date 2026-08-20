import { Request, Response, NextFunction } from "express";
import { PlantService } from "../services/PlantService";
import { CreatePlantDTO, UpdatePlantDTO } from "../schemas/plant.schema";

export class PlantController {
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
      const id = req.user!.id;
      const plants = await this.plantService.listByUserLogged(id);
      return res.status(200).json(plants);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const loggedUser = req.user!.id;
      const createPlantData = req.body as CreatePlantDTO;
      const id = Number(req.params.id);
      const plant = await this.plantService.create(id, createPlantData);
      return res.status(201).json(plant);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const loggedUser = req.user!.id;
      const updatePlantData = req.body as UpdatePlantDTO;
      const id = Number(req.params.id);
      const plant = await this.plantService.update(id, updatePlantData);
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