import { AppError } from "./AppError";
export class UnauthorizedError extends AppError {
  constructor(readonly info?: string) {
    super(info ? `Não autorizado: ${info}` : "Não autorizado", 401);
  }
}