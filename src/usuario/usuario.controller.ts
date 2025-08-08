import { Request, Response, NextFunction, Router } from "express";
import { UsuarioService } from "./usuario.service";
import { Prisma } from "@prisma/client";
import { ApiResponse } from "../utils/api-response";

const router = Router();
const usuarioService = new UsuarioService();

// GET /usuario - Obtener todos los usuarios

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarios = await usuarioService.getAllUsuarios();
        const response: ApiResponse<typeof usuarios> = {
            status: "success",
            message: "Usuarios obtenido correctamente",
            data: usuarios,
        };
        res.json(response);
    }catch (error) {
        next(error);
    }
})

export default router;