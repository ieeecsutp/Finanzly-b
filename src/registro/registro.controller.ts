import { Request, Response, NextFunction, Router } from "express";
import { RegistroService } from "./registro.service";
import { ApiResponse } from "../utils/api-response";
import { registroCreateRq } from "./request/registro-create-rq";
import { registroUpdateRq } from "./request/registro-update-rq";
import { validateRequest } from "../utils/validate-request";
import { RegistroDetailRs } from "./response/registro-detail-rs";
import { RegistroItemRs } from "./response/registro-item-rs";
import { verifyToken } from "../utils/auth";

const router = Router();
const registroService = new RegistroService();

// POST /registros - Crear un nuevo registro
router.post("/",
    registroCreateRq(),
    verifyToken,
    validateRequest("Datos inválidos para crear registro"),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const newRegistro = await registroService.createRegistro(data);

            const response: ApiResponse<RegistroDetailRs> = {
                status: "success",
                message: "Registro creado exitosamente",
                data: newRegistro,
            };

            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }
);

// GET /registros - Obtener todos los registros
router.get("/",verifyToken, async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const registros = await registroService.getAllRegistros();
        
        const response: ApiResponse<RegistroItemRs[]> = {
            status: "success",
            message: "Registros obtenidos correctamente",
            data: registros,
        };
        
        res.json(response);
    } catch (error) {
        next(error);
    }
});

// GET /registros/:id - Obtener un registro por ID
router.get("/:id",verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const registro = await registroService.getRegistroById(id);

        const response: ApiResponse<RegistroDetailRs> = {
            status: "success",
            message: "Registro encontrado",
            data: registro,
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
});

// GET /registros/usuario/:id - Obtener registros por usuario
router.get("/usuario/:id",verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarioId = Number(req.params.id);
        const registros = await registroService.getRegistrosByUsuario(usuarioId);

        const response: ApiResponse<RegistroItemRs[]> = {
            status: "success",
            message: `Registros del usuario obtenidos correctamente`,
            data: registros,
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
});

// GET /registros/categoria/:id - Obtener registros por categoría
router.get("/categoria/:id",verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoriaId = Number(req.params.id);
        const registros = await registroService.getRegistrosByCategoria(categoriaId);

        const response: ApiResponse<RegistroItemRs[]> = {
            status: "success",
            message: `Registros de la categoría obtenidos correctamente`,
            data: registros,
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
});

// GET /registros/fecha - Obtener registros por rango de fechas
// Query params: startDate, endDate, usuarioId (opcional)
router.get("/fecha/rango",verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { startDate, endDate, usuarioId } = req.query;

        if (!startDate || !endDate) {
            const response: ApiResponse<null> = {
                status: "error",
                message: "Los parámetros startDate y endDate son obligatorios",
            };
            return res.status(400).json(response);
        }

        const userIdNumber = usuarioId ? Number(usuarioId) : undefined;
        const registros = await registroService.getRegistrosByDateRange(
            startDate as string,
            endDate as string,
            userIdNumber
        );

        const response: ApiResponse<RegistroItemRs[]> = {
            status: "success",
            message: `Registros del rango de fechas obtenidos correctamente`,
            data: registros,
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
});

// PUT /registros/:id - Actualizar un registro existente
router.put("/:id",
    registroUpdateRq(),
    verifyToken,
    validateRequest("Datos inválidos para actualizar registro"),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const data = req.body;

            const updatedRegistro = await registroService.updateRegistro(id, data);

            const response: ApiResponse<RegistroDetailRs> = {
                status: "success",
                message: "Registro actualizado exitosamente",
                data: updatedRegistro,
            };

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
);

// DELETE /registros/:id - Eliminar un registro
router.delete("/:id",verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);

        await registroService.deleteRegistro(id);

        const response: ApiResponse<null> = {
            status: "success",
            message: "Registro eliminado exitosamente",
            data: null,
        };

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

export default router;