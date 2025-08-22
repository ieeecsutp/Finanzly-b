import { Prisma } from "@prisma/client";
import { CategoriaDetailRs } from "../response/categoria-detail-rs";
import { CategoriaItemRs } from "../response/categoria-item-rs";

// Tipo que representa una Categoria con sus relaciones incluidas
type CategoriaWithRelations = Prisma.CategoriaGetPayload<{
  include: {
    registros: true;
  };
}>;

/**
 * Convierte una categoría con relaciones a CategoriaDetailRs
 * Incluye estadísticas de registros y monto total
 */
export function toCategoriaDetailRs(categoria: CategoriaWithRelations): CategoriaDetailRs {
  const montoTotal = categoria.registros.reduce((total, registro) => {
    return total + parseFloat(registro.monto.toString());
  }, 0);

  return {
    id_categoria: categoria.idCategoria,
    nombre: categoria.nombre,
    tipo: categoria.tipo,
    total_registros: categoria.registros.length,
    monto_total: montoTotal,
  };
}

/**
 * Convierte una categoría con relaciones a CategoriaItemRs
 * Versión resumida para listados
 */
export function toCategoriaItemRs(categoria: CategoriaWithRelations): CategoriaItemRs {
  return {
    id_categoria: categoria.idCategoria,
    nombre: categoria.nombre,
    tipo: categoria.tipo,
    total_registros: categoria.registros.length,
  };
}

/**
 * Convierte un array de categorías con relaciones a un array de CategoriaItemRs
 */
export function toCategoriasItemRsList(categorias: CategoriaWithRelations[]): CategoriaItemRs[] {
  return categorias.map(categoria => toCategoriaItemRs(categoria));
}