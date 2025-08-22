import { PrismaClient, Registro, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export class RegistroRepository {
    async getAll(): Promise<Registro[]> {
        return await prisma.registro.findMany({
            include: {
                usuario: true,
                categoria: true,
            },
        });
    }

    async getById(id: number): Promise<Registro | null> {
        return await prisma.registro.findUnique({
            where: { idRegistro: id },
            include: {
                usuario: true,
                categoria: true,
            },
        });
    }

    async getByUsuarioId(usuarioId: number): Promise<Registro[]> {
        return await prisma.registro.findMany({
            where: { idUsuario: usuarioId },
            include: {
                usuario: true,
                categoria: true,
            },
            orderBy: { fechaRegistro: 'desc' },
        });
    }

    async getByCategoriaId(categoriaId: number): Promise<Registro[]> {
        return await prisma.registro.findMany({
            where: { idCategoria: categoriaId },
            include: {
                usuario: true,
                categoria: true,
            },
            orderBy: { fechaRegistro: 'desc' },
        });
    }

    async getByDateRange(startDate: Date, endDate: Date, usuarioId?: number): Promise<Registro[]> {
        const whereCondition: Prisma.RegistroWhereInput = {
            fechaRegistro: {
                gte: startDate,
                lte: endDate,
            },
        };

        if (usuarioId) {
            whereCondition.idUsuario = usuarioId;
        }

        return await prisma.registro.findMany({
            where: whereCondition,
            include: {
                usuario: true,
                categoria: true,
            },
            orderBy: { fechaRegistro: 'desc' },
        });
    }

    async create(data: Prisma.RegistroCreateInput): Promise<Registro> {
        return await prisma.registro.create({
            data,
            include: {
                usuario: true,
                categoria: true,
            },
        });
    }

    async update(id: number, data: Prisma.RegistroUpdateInput): Promise<Registro> {
        return await prisma.registro.update({
            where: { idRegistro: id },
            data,
            include: {
                usuario: true,
                categoria: true,
            },
        });
    }

    async delete(id: number): Promise<Registro> {
        return await prisma.registro.delete({
            where: { idRegistro: id },
        });
    }

    async checkUsuarioExists(usuarioId: number): Promise<boolean> {
        const usuario = await prisma.usuario.findUnique({
            where: { idUsuario: usuarioId },
        });
        return !!usuario;
    }

    async checkCategoriaExists(categoriaId: number): Promise<boolean> {
        const categoria = await prisma.categoria.findUnique({
            where: { idCategoria: categoriaId },
        });
        return !!categoria;
    }
}