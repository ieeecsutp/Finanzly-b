import { Request, Response, NextFunction, Router } from "express";
import { UsuarioService } from "./usuario.service";
import { Prisma } from "@prisma/client";
import { ApiResponse } from "../utils/api-response";
import { userCreateRq } from "./request/usuario-create-rq";
import { validateRequest } from "../utils/validate-request";
import { UsuarioDetailRs } from "./response/usuario-detail-rs";
import { verifyToken, verifyUserMatch } from "../utils/auth";

const router = Router();
const usuarioService = new UsuarioService();

// POST /usuario - Crear un nuevo usuario
router.post("/",
    userCreateRq(),
    verifyToken,
    validateRequest("Datos invalidos"),
    async (req: Request, res: Response, next: NextFunction) => {
        try{
            const data = req.body;
            const newUsuario = await usuarioService.createUsuario(data);

            const response: ApiResponse<UsuarioDetailRs> = {
                status: "success",
                message: "Usuario creado exitosamente",
                data: newUsuario,
            };

            res.status(201).json(response);
        }catch (error){
            next(error);
        }
    }    
);

// GET /usuario - Obtener todos los usuarios

router.get("/",verifyToken, async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarios = await usuarioService.getAllUsuarios();
        const response: ApiResponse<typeof usuarios> = {
            status: "success",
            message: "Usuarios obtenidos correctamente",
            data: usuarios,
        };
        res.json(response);
    }catch (error) {
        next(error);
    }
});

// GET /usuario/:id - Obtener un usuario por ID

router.get("/:id",
    verifyToken,
    verifyUserMatch,
    async (req: Request, res: Response, next: NextFunction) => {
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




// PUT /usuario/:id - Actualizar un usuario existente
router.put("/:id",
    userCreateRq(), // Puedes usar la misma validación o crear una específica para update
    verifyToken,
    verifyUserMatch,
    validateRequest("Datos invalidos"),
    async (req: Request, res: Response, next: NextFunction) => {
        try{
            const id = Number(req.params.id);
            const data = req.body;
            
            const updatedUsuario = await usuarioService.updateUsuario(id, data);

            const response: ApiResponse<UsuarioDetailRs> = {
                status: "success",
                message: "Usuario actualizado exitosamente",
                data: updatedUsuario,
            };

            res.status(200).json(response);
        }catch (error){
            next(error);
        }
    }    
);

// DELETE /usuario/:id - Eliminar un usuario
router.delete("/:id",
    verifyToken,
    verifyUserMatch,
    async (req: Request, res: Response, next: NextFunction) => {
        try{
            const id = Number(req.params.id);
            
            await usuarioService.deleteUsuario(id);

            const response: ApiResponse<null> = {
                status: "success",
                message: "Usuario eliminado exitosamente",
                data: null,
            };

            res.status(200).json(response);
        }catch (error){
            next(error);
        }
    }    
);

export default router;


//POST - Crear usuario
//GET - Obtener todos los usuarios
//GET /:id - Obtener usuario por ID
//PUT /:id - Actualizar usuario
//DELETE /:id - Eliminar usuario