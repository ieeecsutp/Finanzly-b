import { PrismaClient, Usuario, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export class UsuarioRepository {
    async getAll(): Promise<Usuario[]> {
        return await prisma.usuario.findMany();
    }
}