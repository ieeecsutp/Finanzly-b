import { UsuarioRs } from "./auth-register-rs"

export interface AuthLoginRs {
    access_token: string;
    token_type: string;
    usuario: UsuarioRs;
}
