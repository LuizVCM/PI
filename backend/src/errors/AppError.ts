export abstract class AppError extends Error {
    constructor(message: string, readonly statusCode: number) {
        super(message)
        Object.setPrototypeOf(this, new.target.prototype)
    }
}