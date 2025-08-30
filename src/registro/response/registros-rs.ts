import { RegistroItemRs } from "./registro-item-rs";

export interface RegistrosRs {
    registros: RegistroItemRs[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
}