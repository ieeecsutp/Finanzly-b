import { Prisma } from "@prisma/client";
import { UsuarioRepository } from "./usuario.repository";
import { UsuarioDetailRs } from "./response/usuario-detail-rs";
import { DuplicateResourceError, ResourceNotFoundError } from "../utils/error-types";
import { toUserDetailRs } from "./mapper/usuario.mapper";

export class UsuarioService {
    private usuarioRepository = new UsuarioRepository();

    async createUsuario(data: Prisma.UsuarioCreateInput): Promise<UsuarioDetailRs> {
        const existingUsuario = await this.usuarioRepository.getByEmail(data.correo);
        if (existingUsuario) {
            throw new DuplicateResourceError("El correo ya está registrado.");
        }

        const usuario = await this.usuarioRepository.create(data);
        return toUserDetailRs(usuario);
    }

    async getAllUsuarios() {
        return await this.usuarioRepository.getAll();
    }

    async getUsuarioById(id: number): Promise<UsuarioDetailRs> {
        const usuario = await this.usuarioRepository.getById(id);
        if (!usuario) {
            throw new ResourceNotFoundError("Usuario no econtrado.");
        }
        return toUserDetailRs(usuario);
    }
}