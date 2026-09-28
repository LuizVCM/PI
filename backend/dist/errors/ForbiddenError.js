"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
const AppError_1 = require("./AppError");
class ForbiddenError extends AppError_1.AppError {
    resource;
    info;
    cause;
    constructor(resource, info, cause) {
        super(`Acesso restrito: sem permissão para alterar e acessar ${resource}`, 403);
        this.resource = resource;
        this.info = info;
        this.cause = cause;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            resource: this.resource,
            info: this.info,
            cause: this.cause
        };
    }
}
exports.ForbiddenError = ForbiddenError;
