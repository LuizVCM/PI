"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = adminMiddleware;
const ForbiddenError_1 = require("../errors/ForbiddenError");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const User_1 = require("../models/User");
function adminMiddleware(resource) {
    return (req, res, next) => {
        if (!req.user) {
            throw new UnauthorizedError_1.UnauthorizedError("não autenticado");
        }
        if (req.user.role !== User_1.UserRole.ADMIN) {
            throw new ForbiddenError_1.ForbiddenError(resource, "Acesso permitido apenas para administrador", "Permissão insuficiente");
        }
        next();
    };
}
