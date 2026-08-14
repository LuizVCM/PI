import { ForbiddenError } from "../errors/ForbiddenError";
export class AuthorizationService {
  static ensureOwnership(
    entity: { usuario: { id: number } },
    loggedUserId: number,
    entityName: string
  ) {
    if (!entity.usuario) {
      throw new ForbiddenError(
        entityName,
        `Este ${entityName} não possui um proprietário ativo`
      );
    }
    if (entity.usuario.id !== loggedUserId) {
      throw new ForbiddenError(
        entityName,
        "tentativa de acessar dados de outro usuário"
      );
    }
  }
}