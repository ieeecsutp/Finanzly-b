import { Usuario } from "@prisma/client";
import { AuthLoginRs } from "../response/auth-login-rs";
import { UsuarioRs } from "../response/auth-register-rs";

export interface AuthLogin {
    access_token: string;
    token_type: string;
    usuario: Usuario;
}

export function toAuthLoginRs(authLogin: AuthLogin): AuthLoginRs {
    return {
        access_token: authLogin.access_token,
        token_type: authLogin.token_type,
        usuario: toUserRs(authLogin.usuario),
    };
}

export function toUserRs(usuario: Usuario): UsuarioRs {
    return {
        id: usuario.idUsuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
    }
}