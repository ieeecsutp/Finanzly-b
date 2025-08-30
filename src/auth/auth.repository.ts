import { PrismaClient, Usuario, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthRepository {
    async getByEmail(email: string): Promise<Usuario | null> {
        return await prisma.usuario.findUnique({
            where: { correo: email },
        });
    }

    async create(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
        return await prisma.usuario.create({
            data,
        });
    }
}