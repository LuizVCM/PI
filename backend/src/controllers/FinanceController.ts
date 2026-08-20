import { Request, Response, NextFunction } from "express";
import { FinanceService } from "../services/FinanceService";
import {
  CreateFinanceDTO,
  createFinanceSchema,
  UpdateFinanceDTO,
  updateFinanceSchema,
} from "../schemas/finance.schema";

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
      const id = req.user!.id
      const finances = await this.financeService.listByUserLogged(id);
      return res.status(200).json(finances);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const financeData: CreateFinanceDTO = createFinanceSchema.parse(req.body);
      const id = req.user!.id
      const finance = await this.financeService.create(
        financeData,
        id
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
      const loggedUser = req.user!.id
      const finance = await this.financeService.update(
        id,
        financeData,
        loggedUser
      );
      return res.json(finance);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const loggedUser = req.user!.id
      await this.financeService.delete(id, loggedUser);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}