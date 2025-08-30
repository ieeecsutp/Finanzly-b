import { Request, Response, NextFunction, Router } from "express";
import { AuthService } from "./auth.service";
import { Prisma } from "@prisma/client";
import { ApiResponse } from "../utils/api-response";
import { validateRequest } from "../utils/validate-request";
import { authRegisterRq } from "./request/auth-register-rq";
import { authLoginRq } from "./request/auth-login-rq";
import { AuthLoginRs } from "./response/auth-login-rs";
import { UsuarioRs } from "./response/auth-register-rs";
import { verifyToken } from "../utils/auth";

const router = Router();
const authService = new AuthService();

router.post("/register",
    authRegisterRq(), 
    validateRequest("Datos invalidos"),
    async (req: Request, res: Response, next: NextFunction) => {
        try{
            const data = req.body;
            const newUsuario = await authService.createAuth(data);

            const response: ApiResponse<UsuarioRs> = {
                status: "success",
                message: "Usuaio creado exitosamente",
                data: newUsuario,
            };

            res.status(201).json(response);
        }catch (error){
            next(error);
        }
    }    
);

router.post("/login",
    authLoginRq(), 
    validateRequest("Datos invalidos"),
    async (req: Request, res: Response, next: NextFunction) => {
        try{
            const data = req.body;
            const newUsuario = await authService.loginAuth(data.correo,data.contraseña);

            const response: ApiResponse<AuthLoginRs> = {
                status: "success",
                message: "Usuaio logeado exitosamente",
                data: newUsuario,
            };

            res.status(201).json(response);
        }catch (error){
            next(error);
        }
    }    
);

router.get("/test",
    verifyToken, 
    async (req: Request, res: Response, next: NextFunction) => {
        try{
            const data = {
                user: req.user
            }

            const response: ApiResponse<Object> = {
                status: "success",
                message: "Usuario autenticado",
                data: data,
            }

            res.status(201).json(response)
        }catch(error){
            next(error);
        }
    }
);

export default router;