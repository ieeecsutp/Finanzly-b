import { Usuario } from "@prisma/client";
import { UsuarioDetailRs } from "../response/usuario-detail-rs";

export function toUserDetailRs(usuario: Usuario): UsuarioDetailRs {
  return {
    id_usuario: usuario.idUsuario,
    nombre: usuario.nombre,
    correo: usuario.correo,
    fechaCreado: usuario.fechaCreado.toISOString().split("T")[0],
  };
}