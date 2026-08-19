import { AppError } from "./AppError";
export class ForbiddenError extends AppError {
  constructor(readonly field: string, readonly info?: string, readonly cause?: string) {
    super(
      `Acesso restrito: sem permissão para alterar e acessar ${field}`,
      403
    );
  }
  override toJSON() {
    return {
      ...super.toJSON(),
      field: this.field,
      info: this.info,
      cause: this.cause
    };
  }
}