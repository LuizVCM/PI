import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { CreateUserDTO, UpdateUserDTO } from "../schemas/user.schema";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export class UserController {
  private userService = new UserService();
  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.listAll();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const user = await this.userService.getById(id);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async listByIdWith(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new UnauthorizedError();
      }
      const id = req.user.id;
      const relation: string = req.body.relation;
      const data = await this.userService.listByIdWith(relation, id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createUserData = req.body as CreateUserDTO;
      await this.userService.create(createUserData);
      return res.status(201);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new UnauthorizedError();
      }
      const id = req.user.id;
      const updateUserData = req.body as UpdateUserDTO;
      const user = await this.userService.update(id, updateUserData);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new UnauthorizedError();
      }
      const id = req.user.id;
      await this.userService.delete(id);
      return res.status(204).send("Usuário deletado com sucesso");
    } catch (error) {
      next(error);
    }
  }
}