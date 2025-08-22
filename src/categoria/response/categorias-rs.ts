import { CategoriaItemRs } from "./categoria-item-rs";

export interface CategoriasRs {
    categorias: CategoriaItemRs[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
}