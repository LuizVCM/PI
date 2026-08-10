import { AppError } from "./AppError";
export class NotFoundError extends AppError {
  constructor(field: string, info?: string) {
    super(info ? `Não encontrado: ${field}, ${info}` : `Não encontrado: ${field}`, 404);
  }
}