"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
const BadRequestError_1 = require("../errors/BadRequestError");
function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            throw new BadRequestError_1.BadRequestError(result.error.issues.map((issue) => {
                if (issue.code === "invalid_value" && issue.values) {
                    return {
                        field: issue.path.join("."),
                        message: "Valor inválido",
                        expected: `${issue.values.join(", ")}`
                    };
                }
                return {
                    field: issue.path.join("."),
                    message: issue.message,
                };
            }));
        }
        req.body = result.data;
        next();
    };
}
