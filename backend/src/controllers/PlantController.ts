import { Request, Response } from "express";
import { PlantService } from "../services/PlantService";

export class PlantController {
  private service = new PlantService();

  async listAll(req: Request, res: Response) {
    const plants = await this.service.listAll();
    
    res.status(200).json(plants);
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const plant = await this.service.getById(id);

    res.status(200).json(plant);
  }

  async listBySeedId(req: Request, res: Response) {
    const seedId = Number(req.params.seedId);

    const plants = await this.service.listBySeedId(seedId);

    res.status(200).json(plants);
  }

  async listByUserLogged(req: Request, res: Response) {
    const userId = req.user!.id;

    const plants = await this.service.listByUserLogged(userId);

    res.status(200).json(plants);
  }

  async create(req: Request, res: Response) {
    const plant = await this.service.create(req.body);

    res.status(201).json(plant);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);

    const plant = await this.service.update(id, req.body);

    res.status(200).json(plant);
  }
}