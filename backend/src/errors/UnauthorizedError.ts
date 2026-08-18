import { AppError } from "./AppError";
export class UnauthorizedError extends AppError {
  constructor(readonly info?: string) {
    super(`Não autorizado: ${info}`, 401);
  }
  override toJSON() {
    return {
      success: false,
      message: this.message,
      info: this.info,
    };
  }
}
