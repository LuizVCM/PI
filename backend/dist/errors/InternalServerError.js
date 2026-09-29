"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
const AppError_1 = require("./AppError");
class InternalServerError extends AppError_1.AppError {
    constructor(message = 'Erro interno do servidor') {
        super(message, 500);
    }
}
exports.InternalServerError = InternalServerError;
