"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = void 0;
const AppError_1 = require("./AppError");
class ConflictError extends AppError_1.AppError {
    fields;
    info;
    constructor({ fields = [], message, info } = {}) {
        super(message ??
            (fields.length > 1
                ? `Os seguintes campos já estão em uso: ${fields.join(", ")}`
                : `O seguinte campo já está em uso: ${fields[0]}`), 409);
        this.fields = fields;
        this.info = info;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            fields: this.fields,
            info: this.info,
        };
    }
}
exports.ConflictError = ConflictError;
