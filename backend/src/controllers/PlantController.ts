import { NextFunction, Request, Response } from "express";
import { PlantService } from "../services/PlantService";
import { CreatePlantDTO, UpdatePlantDTO } from "../schemas/plant.schema";

export class PlantController {
  private plantService = new PlantService();
  async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const plants = await this.plantService.listAll();
      return res.status(200).json(plants);
    } catch (error) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const plant = await this.plantService.getById(id);
      return res.status(200).json(plant);
    } catch (error) {
      next(error);
    }
  }
  async listBySeedId(req: Request, res: Response, next: NextFunction) {
    try {
      const seedId = Number(req.params.id);
      const plants = await this.plantService.listBySeedId(seedId);
      return res.status(200).json(plants);
    } catch (error) {
      next(error);
    }
  }
  async listByUserLogged(req: Request, res: Response, next: NextFunction) {
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
      const createPlantData = req.body as CreatePlantDTO;
      const created = await this.plantService.create(createPlantData);
      return res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const updatePlantData = req.body as UpdatePlantDTO;
      const updated = await this.plantService.update(id, updatePlantData);
      return res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }
}