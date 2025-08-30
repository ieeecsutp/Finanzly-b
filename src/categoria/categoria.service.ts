import { Prisma } from "@prisma/client";
import { CategoriaRepository } from "./categoria.repository";
import { CategoriaDetailRs } from "./response/categoria-detail-rs";
import { CategoriaItemRs } from "./response/categoria-item-rs";
import { ResourceNotFoundError, BadRequestError, DuplicateResourceError } from "../utils/error-types";
import { toCategoriaDetailRs, toCategoriasItemRsList } from "./mapper/categoria.mapper";
import { toRegistrosItemRsList } from "../registro/mapper/registro.mapper";
import { RegistroItemRs } from "../registro/response/registro-item-rs";

interface CategoriaCreateInput {
    nombre: string;
    tipo: string;
}

interface CategoriaUpdateInput {
    nombre?: string;
    tipo?: string;
}

export class CategoriaService {
    private categoriaRepository = new CategoriaRepository();

    async createCategoria(data: CategoriaCreateInput): Promise<CategoriaDetailRs> {
        // Verificar que no exista otra categoría con el mismo nombre y tipo
        const existingCategoria = await this.categoriaRepository.getByNombreAndTipo(data.nombre, data.tipo);
        if (existingCategoria) {
            throw new DuplicateResourceError(`Ya existe una categoría "${data.nombre}" de tipo "${data.tipo}".`);
        }

        const categoriaData: Prisma.CategoriaCreateInput = {
            nombre: data.nombre.trim(),
            tipo: data.tipo,
        };

        const categoria = await this.categoriaRepository.create(categoriaData);
        return toCategoriaDetailRs(categoria as any);
    }

    async getAllCategorias(): Promise<CategoriaItemRs[]> {
        const categorias = await this.categoriaRepository.getAll();
        return toCategoriasItemRsList(categorias as any);
    }

    async getCategoriaById(id: number): Promise<CategoriaDetailRs> {
        const categoria = await this.categoriaRepository.getById(id);
        if (!categoria) {
            throw new ResourceNotFoundError("Categoría no encontrada.");
        }
        return toCategoriaDetailRs(categoria as any);
    }

    async getCategoriasByTipo(tipo: string): Promise<CategoriaItemRs[]> {
        // Validar que el tipo sea válido
        const tiposValidos = ["ingreso", "gasto", "transferencia", "ahorro"];
        if (!tiposValidos.includes(tipo)) {
            throw new BadRequestError("El tipo debe ser: ingreso, gasto, transferencia o ahorro.");
        }

        const categorias = await this.categoriaRepository.getByTipo(tipo);
        return toCategoriasItemRsList(categorias as any);
    }

    async getRegistrosByCategoria(categoriaId: number): Promise<RegistroItemRs[]> {
        // Verificar que la categoría existe
        const categoria = await this.categoriaRepository.getById(categoriaId);
        if (!categoria) {
            throw new ResourceNotFoundError("Categoría no encontrada.");
        }

        const registros = await this.categoriaRepository.getRegistrosByCategoriaId(categoriaId);
        return toRegistrosItemRsList(registros as any);
    }

    async updateCategoria(id: number, data: CategoriaUpdateInput): Promise<CategoriaDetailRs> {
        // Verificar que la categoría existe
        const existingCategoria = await this.categoriaRepository.getById(id);
        if (!existingCategoria) {
            throw new ResourceNotFoundError("Categoría no encontrada.");
        }

        // Si se está actualizando nombre o tipo, verificar que no se duplique
        if (data.nombre || data.tipo) {
            const nombreToCheck = data.nombre ? data.nombre.trim() : existingCategoria.nombre;
            const tipoToCheck = data.tipo || existingCategoria.tipo;

            const duplicateCategoria = await this.categoriaRepository.getByNombreAndTipoExcludingId(
                nombreToCheck, 
                tipoToCheck, 
                id
            );

            if (duplicateCategoria) {
                throw new DuplicateResourceError(`Ya existe una categoría "${nombreToCheck}" de tipo "${tipoToCheck}".`);
            }
        }

        const updateData: Prisma.CategoriaUpdateInput = {};
        
        if (data.nombre) updateData.nombre = data.nombre.trim();
        if (data.tipo) updateData.tipo = data.tipo;

        const updatedCategoria = await this.categoriaRepository.update(id, updateData);
        return toCategoriaDetailRs(updatedCategoria as any);
    }

    async deleteCategoria(id: number): Promise<void> {
        // Verificar que la categoría existe
        const existingCategoria = await this.categoriaRepository.getById(id);
        if (!existingCategoria) {
            throw new ResourceNotFoundError("Categoría no encontrada.");
        }

        // Verificar que no tiene registros asociados
        const hasRegistros = await this.categoriaRepository.hasRegistros(id);
        if (hasRegistros) {
            throw new BadRequestError("No se puede eliminar la categoría porque tiene registros asociados.");
        }

        await this.categoriaRepository.delete(id);
    }

    async getCategoriaStats(id: number) {
        // Verificar que la categoría existe
        const categoria = await this.categoriaRepository.getById(id);
        if (!categoria) {
            throw new ResourceNotFoundError("Categoría no encontrada.");
        }

        const stats = await this.categoriaRepository.getCategoriaStats(id);
        
        return {
            id_categoria: id,
            nombre: categoria.nombre,
            tipo: categoria.tipo,
            total_registros: stats.totalRegistros,
            monto_total: stats.montoTotal,
        };
    }
}