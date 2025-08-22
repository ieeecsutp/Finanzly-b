import { PrismaClient, Categoria, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export class CategoriaRepository {
    async getAll(): Promise<Categoria[]> {
        return await prisma.categoria.findMany({
            include: {
                registros: true,
            },
        });
    }

    async getById(id: number): Promise<Categoria | null> {
        return await prisma.categoria.findUnique({
            where: { idCategoria: id },
            include: {
                registros: true,
            },
        });
    }

    async getByTipo(tipo: string): Promise<Categoria[]> {
        return await prisma.categoria.findMany({
            where: { tipo: tipo },
            include: {
                registros: true,
            },
            orderBy: { nombre: 'asc' },
        });
    }

    async getByNombre(nombre: string): Promise<Categoria | null> {
        return await prisma.categoria.findFirst({
            where: { 
                nombre: {
                    equals: nombre,
                    mode: 'insensitive' // Case insensitive
                }
            },
        });
    }

    async getByNombreAndTipo(nombre: string, tipo: string): Promise<Categoria | null> {
        return await prisma.categoria.findFirst({
            where: { 
                nombre: {
                    equals: nombre,
                    mode: 'insensitive'
                },
                tipo: tipo
            },
        });
    }

    async getByNombreAndTipoExcludingId(nombre: string, tipo: string, excludeId: number): Promise<Categoria | null> {
        return await prisma.categoria.findFirst({
            where: { 
                nombre: {
                    equals: nombre,
                    mode: 'insensitive'
                },
                tipo: tipo,
                NOT: {
                    idCategoria: excludeId
                }
            },
        });
    }

    async create(data: Prisma.CategoriaCreateInput): Promise<Categoria> {
        return await prisma.categoria.create({
            data,
            include: {
                registros: true,
            },
        });
    }

    async update(id: number, data: Prisma.CategoriaUpdateInput): Promise<Categoria> {
        return await prisma.categoria.update({
            where: { idCategoria: id },
            data,
            include: {
                registros: true,
            },
        });
    }

    async delete(id: number): Promise<Categoria> {
        return await prisma.categoria.delete({
            where: { idCategoria: id },
        });
    }

    async hasRegistros(categoriaId: number): Promise<boolean> {
        const count = await prisma.registro.count({
            where: { idCategoria: categoriaId },
        });
        return count > 0;
    }

    async getRegistrosByCategoriaId(categoriaId: number) {
        return await prisma.registro.findMany({
            where: { idCategoria: categoriaId },
            include: {
                usuario: true,
                categoria: true,
            },
            orderBy: { fechaRegistro: 'desc' },
        });
    }

    async getCategoriaStats(categoriaId: number) {
        const stats = await prisma.registro.aggregate({
            where: { idCategoria: categoriaId },
            _count: {
                idRegistro: true,
            },
            _sum: {
                monto: true,
            },
        });

        return {
            totalRegistros: stats._count.idRegistro,
            montoTotal: stats._sum.monto ? parseFloat(stats._sum.monto.toString()) : 0,
        };
    }
}