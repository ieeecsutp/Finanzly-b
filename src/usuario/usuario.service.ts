import { UsuarioRepository } from "./usuario.repository";

export class UsuarioService {
    private usuarioRepository = new UsuarioRepository();

    async getAllUsuarios() {
        return await this.usuarioRepository.getAll();
    }
}