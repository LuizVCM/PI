import { $ZodIssue } from "zod/v4/core";
import { AppError } from "./AppError";
export class BadRequestError extends AppError {
    constructor(message = 'Bad Request', readonly errors?: $ZodIssue[]) {
        super(message, 400)
    }
}