import { NextFunction, Request, Response } from "express";
import { CropService } from "./../services/CropService";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { CreateCropDTO } from "../schemas/crop.schema";
export class CropController {
  private cropService = new CropService();
  async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const crops = await this.cropService.listAll();
      return res.json(crops);
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new UnauthorizedError("não autenticado");
      }
      const loggeduserId = req.user.id;
      const territoryId = Number(req.params.id);
      const createCropData = req.body as CreateCropDTO;
      const crop = await this.cropService.create(
        createCropData,
        territoryId,
        loggeduserId
      );
      return res.status(201).json(crop);
    } catch (error) {
      next(error);
    }
  }
}
