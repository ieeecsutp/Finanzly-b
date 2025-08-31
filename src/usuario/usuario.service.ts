import { Prisma } from "@prisma/client";
import { UsuarioRepository } from "./usuario.repository";
import { UsuarioDetailRs } from "./response/usuario-detail-rs";
import { DuplicateResourceError, ResourceNotFoundError } from "../utils/error-types";
import { toUserDetailRs } from "./mapper/usuario.mapper";
import { getPasswordHash } from "../utils/auth"

export class UsuarioService {
    private usuarioRepository = new UsuarioRepository();

    async createUsuario(data: Prisma.UsuarioCreateInput): Promise<UsuarioDetailRs> {
        const existingUsuario = await this.usuarioRepository.getByEmail(data.correo);
        if (existingUsuario) {
            throw new DuplicateResourceError("El correo ya está registrado.");
        }

        // Hashear la contraseña antes de guardar
        const hashed = getPasswordHash(data.contraseña);
        data.contraseña = hashed;

        const usuario = await this.usuarioRepository.create(data);
        return toUserDetailRs(usuario);
    }

    async getAllUsuarios() {
        return await this.usuarioRepository.getAll();
    }

    async getUsuarioById(id: number): Promise<UsuarioDetailRs> {
        const usuario = await this.usuarioRepository.getById(id);
        if (!usuario) {
            throw new ResourceNotFoundError("Usuario no encontrado.");
        }
        return toUserDetailRs(usuario);
    }

    async updateUsuario(id: number, data: Prisma.UsuarioUpdateInput): Promise<UsuarioDetailRs> {
        // Verificar que el usuario existe antes de actualizar
        const existingUsuario = await this.usuarioRepository.getById(id);
        if (!existingUsuario) {
            throw new ResourceNotFoundError("Usuario no encontrado.");
        }

        const updatedUsuario = await this.usuarioRepository.update(id, data);
        return toUserDetailRs(updatedUsuario);
    }

    async deleteUsuario(id: number): Promise<void> {
        // Verificar que el usuario existe antes de eliminar
        const existingUsuario = await this.usuarioRepository.getById(id);
        if (!existingUsuario) {
            throw new ResourceNotFoundError("Usuario no encontrado.");
        }

        await this.usuarioRepository.delete(id);
    }
}