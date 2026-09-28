"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
    toJSON() {
        return {
            success: false,
            message: this.message,
            cause: this.cause
        };
    }
}
exports.AppError = AppError;
