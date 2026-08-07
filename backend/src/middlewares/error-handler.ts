import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { BadRequestError } from "../errors/BadRequestError";

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message, ...(error instanceof BadRequestError && error.details ? { errors: error.details } : {}),
    });
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Erro interno do servidor",
  });
}