import { Request, Response, NextFunction } from "express";
import { SeedService } from "../services/SeedService";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export class SeedController {
  private seedService = new SeedService();

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const seeds = await this.seedService.listAll();

      return res.json(seeds);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const seed = await this.seedService.getById(id);

      return res.json(seed);
    } catch (error) {
      next(error);
    }
  }

  async listMySeeds(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new UnauthorizedError("não autenticado");
      }

      const seeds = await this.seedService.listByUserLogged(req.user.id);

      return res.status(200).json(seeds);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new UnauthorizedError("não autenticado");
      }

      const { dataCompra, nomePlanta, dataPlantio, quantidade } = req.body;

      const seed = await this.seedService.create(
        {
          dataCompra,
          nomePlanta,
          dataPlantio,
          quantidade,
        },
        req.user.id
      );

      return res.status(201).json(seed);
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

      const { dataCompra, nomePlanta, dataPlantio, quantidade } = req.body;

      const seed = await this.seedService.update(
        id,
        {
          dataCompra,
          nomePlanta,
          dataPlantio,
          quantidade,
        },
        loggedUser
      );

      return res.json(seed);
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

      await this.seedService.delete(id, loggedUser);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}