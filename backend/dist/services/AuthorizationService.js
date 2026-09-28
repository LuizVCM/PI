"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationService = void 0;
const ForbiddenError_1 = require("../errors/ForbiddenError");
class AuthorizationService {
    static ensureOwnership(entity, loggedUserId, entityName) {
        if (!entity.usuario) {
            throw new ForbiddenError_1.ForbiddenError(entityName, `${entityName} não possui um proprietário ativo`);
        }
        if (entity.usuario.id !== loggedUserId) {
            throw new ForbiddenError_1.ForbiddenError(entityName, "tentativa de acessar dados de outro usuário");
        }
    }
    static ensureRelationActive(relation, entityName, relationName) {
        if (!relation) {
            throw new ForbiddenError_1.ForbiddenError(entityName, `${entityName} não está ativo(a)`, Array.isArray(relationName)
                ? `${relationName.join(", ")} associados(as) não estão disponíveis`
                : `${relationName} associado(a) não está disponível`);
        }
    }
}
exports.AuthorizationService = AuthorizationService;
