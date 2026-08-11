import { Request, Response, NextFunction } from "express";
import { TerritoryService } from "../services/TerritoryService";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { CreateTerritoryDTO, UpdateTerritoryDTO } from "../schemas/territory.schema";

export class TerritoryController {
  private territoryService = new TerritoryService();
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const territory = await this.territoryService.listAll();
      return res.json(territory);
    } catch (error) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const territory = await this.territoryService.getById(id);
      return res.json(territory);
    } catch (error) {
      next(error);
    }
  }
  async listMyTerritories(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new UnauthorizedError("não autenticado");
      }
      const id = req.user.id;
      const myTerritories = await this.territoryService.listByUserLogged(id);
      return res.status(200).json(myTerritories);
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new UnauthorizedError("não autenticado");
      }
      const id = req.user.id;
      const createTerritoryData = req.body as CreateTerritoryDTO;
      const territory = await this.territoryService.create(
        createTerritoryData,
        id
      );

      return res.status(201).json(territory);
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
      const loggedUser = req.user.id;
      const updateTerritoryData = req.body as UpdateTerritoryDTO;
      const Territory = await this.territoryService.update(
        id,
        updateTerritoryData,
        loggedUser
      );
      return res.json(Territory);
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
      await this.territoryService.delete(id, loggedUser);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}