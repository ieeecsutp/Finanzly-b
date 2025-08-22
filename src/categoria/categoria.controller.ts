import { Request, Response, NextFunction, Router } from "express";
import { CategoriaService } from "./categoria.service";
import { ApiResponse } from "../utils/api-response";
import { categoriaCreateRq } from "./request/categoria-create-rq";
import { categoriaUpdateRq } from "./request/categoria-update-rq";
import { validateRequest } from "../utils/validate-request";
import { CategoriaDetailRs } from "./response/categoria-detail-rs";
import { CategoriaItemRs } from "./response/categoria-item-rs";
import { RegistroItemRs } from "../registro/response/registro-item-rs";

const router = Router();
const categoriaService = new CategoriaService();

// POST /categorias - Crear una nueva categoría
router.post("/",
    categoriaCreateRq(),
    validateRequest("Datos inválidos para crear categoría"),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const newCategoria = await categoriaService.createCategoria(data);

            const response: ApiResponse<CategoriaDetailRs> = {
                status: "success",
                message: "Categoría creada exitosamente",
                data: newCategoria,
            };

            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }
);

// GET /categorias - Obtener todas las categorías
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const categorias = await categoriaService.getAllCategorias();
        
        const response: ApiResponse<CategoriaItemRs[]> = {
            status: "success",
            message: "Categorías obtenidas correctamente",
            data: categorias,
        };
        
        res.json(response);
    } catch (error) {
        next(error);
    }
});

// GET /categorias/:id - Obtener una categoría por ID
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const categoria = await categoriaService.getCategoriaById(id);

        const response: ApiResponse<CategoriaDetailRs> = {
            status: "success",
            message: "Categoría encontrada",
            data: categoria,
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
});

// GET /categorias/tipo/:tipo - Obtener categorías por tipo
router.get("/tipo/:tipo", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tipo = req.params.tipo;
        const categorias = await categoriaService.getCategoriasByTipo(tipo);

        const response: ApiResponse<CategoriaItemRs[]> = {
            status: "success",
            message: `Categorías de tipo "${tipo}" obtenidas correctamente`,
            data: categorias,
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
});

// GET /categorias/:id/registros - Obtener todos los registros de una categoría
router.get("/:id/registros", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoriaId = Number(req.params.id);
        const registros = await categoriaService.getRegistrosByCategoria(categoriaId);

        const response: ApiResponse<RegistroItemRs[]> = {
            status: "success",
            message: "Registros de la categoría obtenidos correctamente",
            data: registros,
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
});

// GET /categorias/:id/stats - Obtener estadísticas de una categoría
router.get("/:id/stats", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const stats = await categoriaService.getCategoriaStats(id);

        const response: ApiResponse<typeof stats> = {
            status: "success",
            message: "Estadísticas de la categoría obtenidas correctamente",
            data: stats,
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
});

// PUT /categorias/:id - Actualizar una categoría existente
router.put("/:id",
    categoriaUpdateRq(),
    validateRequest("Datos inválidos para actualizar categoría"),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const data = req.body;

            const updatedCategoria = await categoriaService.updateCategoria(id, data);

            const response: ApiResponse<CategoriaDetailRs> = {
                status: "success",
                message: "Categoría actualizada exitosamente",
                data: updatedCategoria,
            };

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
);

// DELETE /categorias/:id - Eliminar una categoría
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);

        await categoriaService.deleteCategoria(id);

        const response: ApiResponse<null> = {
            status: "success",
            message: "Categoría eliminada exitosamente",
            data: null,
        };

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

export default router;