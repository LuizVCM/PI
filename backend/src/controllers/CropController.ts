import { Request, Response, NextFunction } from "express";
import { CropService } from "../services/CropService";
import { UserService } from "../services/UserService";

const userService = new UserService();
const territorioService = new CropService();
export class CropController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const territorio = await territorioService.listAll();
      return res.json(territorio);
    } catch (error) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const territorio = await territorioService.getById(id);
      return res.json(territorio);
    } catch (error) {
      next(error);
    }
  }
  async listMyCrops(req: Request, res: Response, next: NextFunction) {
    try {
      const loggedUser = (req as any).user;
      const myCrops = await userService.listByIdWith("territorios", loggedUser.id);
      return res.status(200).json(myCrops);
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { cep, tamanho } = req.body;
      const loggedUser = (req as any).user;
      const territorio = await territorioService.create(
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
      const loggedUser = (req as any).user;

      const territorio = await territorioService.update(
        id,
        { cep, tamanho },
        loggedUser.id
      );
      return res.json(territorio);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await territorioService.delete(id);
      return res.status(204).send("Território deletado com sucesso!!!");
    } catch (erro) {
      next(erro);
    }
  }
}
