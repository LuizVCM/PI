import { Request, Response, NextFunction } from "express";
import { FinanceService } from "../services/FinanceService";
import {
  CreateFinanceDTO,
  createFinanceSchema,
  UpdateFinanceDTO,
  updateFinanceSchema,
} from "../schemas/finance.schema";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export class FinanceController {
  private financeService = new FinanceService();

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const finances = await this.financeService.listAll();

      return res.json(finances);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const finance = await this.financeService.getById(id);

      return res.json(finance);
    } catch (error) {
      next(error);
    }
  }

  async listMyFinances(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new UnauthorizedError("não autenticado");
      }

      const finances = await this.financeService.listByUserId(req.user.id);

      return res.status(200).json(finances);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const financeData: CreateFinanceDTO = createFinanceSchema.parse(req.body);

      if (!req.user?.id) {
        throw new UnauthorizedError("não autenticado");
      }

      const finance = await this.financeService.create(
        financeData,
        req.user.id
      );

      return res.status(201).json(finance);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const financeData: UpdateFinanceDTO = updateFinanceSchema.parse(req.body);

      if (!req.user?.id) {
        throw new UnauthorizedError("não autenticado");
      }

      const finance = await this.financeService.update(
        id,
        financeData,
        req.user.id
      );

      return res.json(finance);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      await this.financeService.delete(id);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}