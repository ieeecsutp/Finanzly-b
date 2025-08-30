import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt ,{ JwtPayload } from "jsonwebtoken";
import { BadRequestError, DuplicateResourceError, ResourceNotFoundError, UnauthorizedError } from "../utils/error-types";

const settings = {
  access_token_expire_minutes: 30,
  secret_key: "mi_secreto_super_seguro"
};

// --- Extensión de la interfaz Request para TypeScript ---
declare module "express-serve-static-core" {
  interface Request {
    user?: AuthPayload; 
  }
}

interface AuthPayload extends jwt.JwtPayload {
  id: number;
  nombre: string;
  correo: string;
}

// Verificar contraseña
export function verifyPassword(plainPassword: string, hashedPassword: string) {
  try {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  } catch (err) {
    return false;
  }
}

// Hashear contraseña
export function getPasswordHash(password: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

// Crear access token
export function createAccessToken(data : Object, expiresInMinutes = null) {
  const payload = { ...data };
  const expiresIn = expiresInMinutes || settings.access_token_expire_minutes;

  return jwt.sign(payload, settings.secret_key, {
    algorithm: "HS256",
    expiresIn: `${expiresIn}m`
  });
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    throw new UnauthorizedError("Token requerido.");
  }
  

  try {
    const decoded = jwt.verify(token, settings.secret_key);

    if (typeof decoded === "string") {
      throw new UnauthorizedError("Token inválido.");
    }

    req.user = decoded as AuthPayload; // guardamos el payload del JWT en req.user
    next();
  } catch (error) {
    throw new UnauthorizedError("Token invalido o expirado.");
  }
};

// Para verificar usuario

export const verifyUserMatch = (req: Request, res: Response, next: NextFunction) => {
  const paramId = req.params.id;
  if (!paramId) throw new UnauthorizedError("El parámetro id es requerido.");

  if (req.user?.id?.toString() !== paramId) {
    throw new UnauthorizedError("No autorizado para acceder a este recurso.");
  }

  next();
};