export class BaseError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends BaseError {
    constructor(message = "Solicitud incorrecta") {
        super(message, 400);
    }
}

export class UnauthorizedError extends BaseError {
  constructor(message = "No autorizado") {
    super(message, 401);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message = "Acceso prohibido") {
    super(message, 403);
  }
}

export class ResourceNotFoundError extends BaseError {
  constructor(message = "Recurso no encontrado") {
    super(message, 404);
  }
}

export class DuplicateResourceError extends BaseError {
  constructor(message = "Recurso duplicado") {
    super(message, 409);
  }
}