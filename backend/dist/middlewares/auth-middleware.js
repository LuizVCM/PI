"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const json_web_token_1 = require("../auth/json-web-token");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
function authMiddleware(req, _res, next) {
    const token = req.cookies.token;
    if (!token) {
        throw new UnauthorizedError_1.UnauthorizedError("não autenticado");
    }
    const payload = (0, json_web_token_1.verifyToken)(token);
    if (!payload) {
        throw new UnauthorizedError_1.UnauthorizedError("não autenticado");
    }
    req.user = payload;
    next();
}
