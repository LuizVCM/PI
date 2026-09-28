"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const AppError_1 = require("./AppError");
class UnauthorizedError extends AppError_1.AppError {
    info;
    constructor(info) {
        super(`Não autorizado: ${info}`, 401);
        this.info = info;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            info: this.info,
        };
    }
}
exports.UnauthorizedError = UnauthorizedError;
