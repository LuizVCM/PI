import { AppError } from "./AppError";
export class ForbiddenError extends AppError {
  constructor(readonly details: string, readonly info?: string) {
    super(
      info
        ? `Acesso restrito: sem permissão para alterar e acessar ${details}, ${info}`
        : `Acesso restrito: sem permissão para alterar e acessar ${details}`,
      403
    );
  }
}