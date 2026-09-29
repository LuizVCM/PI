"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const AppError_1 = require("./AppError");
class BadRequestError extends AppError_1.AppError {
    details;
    field;
    constructor(details, field) {
        super(`Requisição incorreta`, 400);
        this.details = details;
        this.field = field;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            ...(this.details ? { errors: this.details } : {}),
        };
    }
}
exports.BadRequestError = BadRequestError;
