"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminTokenMiddleware = adminTokenMiddleware;
const InternalServerError_1 = require("../errors/InternalServerError");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
function adminTokenMiddleware(req, res, next) {
    const expectedToken = process.env.ADMIN_TOKEN;
    const receivedToken = req.headers["x-admin-token"];
    if (!expectedToken) {
        throw new InternalServerError_1.InternalServerError("Token de administrador não configurado");
    }
    if (!receivedToken || receivedToken !== expectedToken) {
        throw new UnauthorizedError_1.UnauthorizedError("token de administrador inválido");
    }
    next();
}
