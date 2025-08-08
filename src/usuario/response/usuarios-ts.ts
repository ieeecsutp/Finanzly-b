import { UsuarioItemRs } from "./usuario-item-rs";

export interface UsuariosRs {
    usuarios: UsuarioItemRs[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
}