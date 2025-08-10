import { PrismaClient, Usuario, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export class UsuarioRepository {
    async getAll(): Promise<Usuario[]> {
        return await prisma.usuario.findMany();
    }

    async getById(id: number): Promise<Usuario | null> {
        return await prisma.usuario.findUnique({
            where: { idUsuario: id },
            include: { registros: false },
        });
    }

    async create(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
        return await prisma.usuario.create({
            data,
        });
    }

    async getByEmail(email: string): Promise<Usuario | null> {
        return await prisma.usuario.findUnique({
            where: { correo: email },
        });
    }
}