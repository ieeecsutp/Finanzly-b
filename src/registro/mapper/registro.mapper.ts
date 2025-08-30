import { Prisma } from "@prisma/client";
import { RegistroDetailRs } from "../response/registro-detail-rs";
import { RegistroItemRs } from "../response/registro-item-rs";
import { formatDateToISO } from "../../utils/date";

// Tipo que representa un Registro con sus relaciones incluidas
type RegistroWithRelations = Prisma.RegistroGetPayload<{
  include: {
    usuario: true;
    categoria: true;
  };
}>;

/**
 * Convierte un registro con relaciones a RegistroDetailRs
 * Incluye información completa del usuario y categoría
 */
export function toRegistroDetailRs(registro: RegistroWithRelations): RegistroDetailRs {
  return {
    id_registro: registro.idRegistro,
    tipo: registro.tipo,
    descripcion: registro.descripcion,
    monto: parseFloat(registro.monto.toString()),
    fecha_registro: formatDateToISO(registro.fechaRegistro),
    fecha_creacion: formatDateToISO(registro.fechaCreacion),
    usuario: {
      id_usuario: registro.usuario.idUsuario,
      nombre: registro.usuario.nombre,
    },
    categoria: {
      id_categoria: registro.categoria.idCategoria,
      nombre: registro.categoria.nombre,
      tipo: registro.categoria.tipo,
    },
  };
}

/**
 * Convierte un registro con relaciones a RegistroItemRs
 * Versión resumida para listados
 */
export function toRegistroItemRs(registro: RegistroWithRelations): RegistroItemRs {
  return {
    id_registro: registro.idRegistro,
    tipo: registro.tipo,
    descripcion: registro.descripcion,
    monto: parseFloat(registro.monto.toString()),
    fecha_registro: formatDateToISO(registro.fechaRegistro),
    usuario: {
      id_usuario: registro.usuario.idUsuario,
      nombre: registro.usuario.nombre,
    },
    categoria: {
      id_categoria: registro.categoria.idCategoria,
      nombre: registro.categoria.nombre,
      tipo: registro.categoria.tipo,
    },
  };
}

/**
 * Convierte un array de registros con relaciones a un array de RegistroItemRs
 */
export function toRegistrosItemRsList(registros: RegistroWithRelations[]): RegistroItemRs[] {
  return registros.map(registro => toRegistroItemRs(registro));
}