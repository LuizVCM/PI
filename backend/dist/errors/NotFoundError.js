"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const AppError_1 = require("./AppError");
class NotFoundError extends AppError_1.AppError {
    field;
    info;
    constructor(field, info) {
        super(`Não encontrado: ${field}`, 404);
        this.field = field;
        this.info = info;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            field: this.field,
            info: this.info,
        };
    }
}
exports.NotFoundError = NotFoundError;
