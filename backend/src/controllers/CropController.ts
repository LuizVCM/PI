import { Request, Response, NextFunction } from "express";
import { CropService } from "../services/CropService";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export class CropController {
  private cropService = new CropService();
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const crop = await this.cropService.listAll();
      return res.json(crop);
    } catch (error) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const crop = await this.cropService.getById(id);
      return res.json(crop);
    } catch (error) {
      next(error);
    }
  }
  async listMyCrops(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new UnauthorizedError("não autenticado");
      }
      const id = req.user.id;
      const myCrops = await this.cropService.listByUserLogged(id);
      return res.status(200).json(myCrops);
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { cep, tamanho } = req.body;
      const loggedUser = (req as any).user;
      const territorio = await this.cropService.create(
        { cep, tamanho },
        loggedUser.id
      );

      return res.status(201).json(territorio);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { cep, tamanho } = req.body;
      if (!req.user?.id) {
        throw new UnauthorizedError("não autenticado");
      }
      const loggedUser = req.user.id;
      const crop = await this.cropService.update(id, { cep, tamanho }, loggedUser);
      return res.json(crop);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (!req.user?.id) {
        throw new UnauthorizedError("não autenticado");
      }
      const loggedUser = req.user.id;
      await this.cropService.delete(id, loggedUser);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}