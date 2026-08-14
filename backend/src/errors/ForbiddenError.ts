import { AppError } from "./AppError";
export class ForbiddenError extends AppError {
  constructor(readonly field: string, readonly info?: string) {
    super(
      `Acesso restrito: sem permissão para alterar e acessar ${field}`,
      403
    );
  }
  override toJSON() {
    return {
      success: false,
      message: this.message,
      info: this.info,
    };
  }
}