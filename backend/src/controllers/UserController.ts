import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import {
  CreateUserDTO,
  createUserSchema,
  UpdateUserDTO,
  updateUserSchema,
} from "../schemas/user.schema";

const userService = new UserService();
export class UserController {
  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.listAll();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const user = await userService.getById(id);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createUserData: CreateUserDTO = createUserSchema.parse(req.body);
      const user = await userService.create(createUserData);
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const updateUserData: UpdateUserDTO = updateUserSchema.parse(req.body);
      const user = await userService.update(id, updateUserData);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const user = await userService.delete(id);
      return res.status(204).send("Usuário deletado com sucesso!!");
    } catch (error) {
      next(error);
    }
  }
}
