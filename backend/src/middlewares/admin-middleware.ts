import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../errors/ForbiddenError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { UserRole } from "../models/User";

export function adminMiddleware(recurso: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError("não autenticado");
    }
    if (req.user.role !== UserRole.ADMIN) {
      throw new ForbiddenError(
        recurso,
        "",
        "Acesso permitido apenas para administrador"
      );
    }
    next();
  };
}