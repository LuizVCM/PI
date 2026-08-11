import { Request, Response, NextFunction } from "express";
import { StockService } from "../services/StockService";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export class StockController {
  private stockService = new StockService();

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const stocks = await this.stockService.listAll();
      return res.json(stocks);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const stock = await this.stockService.getById(id);

      return res.json(stock);
    } catch (error) {
      next(error);
    }
  }

  async listMyStock(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new UnauthorizedError("não autenticado");
      }

      const stocks = await this.stockService.listByUserLogged(req.user.id);

      return res.status(200).json(stocks);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new UnauthorizedError("não autenticado");
      }

      const loggedUser = req.user.id;

      const stock = await this.stockService.create(req.body, loggedUser);

      return res.status(201).json(stock);
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

      const stock = await this.stockService.update(id, req.body, loggedUser);

      return res.json(stock);
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

      await this.stockService.delete(id, loggedUser);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}