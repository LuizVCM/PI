"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const AppError_1 = require("../errors/AppError");
function errorHandler(error, _req, res, _next) {
    if (error instanceof AppError_1.AppError) {
        return res.status(error.statusCode).json(error.toJSON());
    }
    console.error(error);
    return res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
    });
}
