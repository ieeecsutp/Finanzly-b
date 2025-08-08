import { Request, Response, NextFunction } from "express";
import { BaseError } from "./error-types";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error("[ERROR] Error interno del servidor:", err);

  res.status(500).json({
    status: "error",
    message: "Error interno del servidor",
  });
}