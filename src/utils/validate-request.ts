import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ApiResponse, ApiFieldError } from "./api-response";

export const validateRequest = (customMessage = "Error de validación") => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors: ApiFieldError[] = errors.array().flatMap(err => {
      if (err.type === "field") {
        return [{
          field: err.path,
          message: typeof err.msg === "string" ? err.msg : "Valor inválido"
        }];
      }
      return [];
    });

    const response: ApiResponse<null> = {
      status: "error",
      message: customMessage,
      error: formattedErrors,
    };

    res.status(400).json(response);
    return;
  }

  next();
};