import { Request, Response, NextFunction, Router } from "express";
import { UsuarioService } from "./usuario.service";
import { Prisma } from "@prisma/client";
import { ApiResponse } from "../utils/api-response";
import { userCreateRq } from "./request/usuario-create-rq";
import { validateRequest } from "../utils/validate-request";
import { UsuarioDetailRs } from "./response/usuario-detail-rs";

const router = Router();
const usuarioService = new UsuarioService();

// POST /usuario - Crear un nuevo usuario
router.post("/",
    userCreateRq(), 
    validateRequest("Datos invalidos"),
    async (req: Request, res: Response, next: NextFunction) => {
        try{
            const data = req.body;
            const newUsuario = await usuarioService.createUsuario(data);

            const response: ApiResponse<UsuarioDetailRs> = {
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
});

// GET /usuario/:id - Obtener un usuario por ID

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const usuario = await usuarioService.getUsuarioById(id);

        const response: ApiResponse<UsuarioDetailRs> = {
            status: "success",
            message: "Usuario encontrado",
            data: usuario,
        };

        res.json(response);
    }catch(error){
        next(error);
    }
});

export default router;