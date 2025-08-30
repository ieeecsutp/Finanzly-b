import { Prisma } from "@prisma/client";
import { AuthRepository } from "./auth.repository";
import { AuthLoginRs } from "./response/auth-login-rs";
import { UsuarioRs } from "./response/auth-register-rs";
import { BadRequestError, DuplicateResourceError, ResourceNotFoundError, UnauthorizedError } from "../utils/error-types";
import { toAuthLoginRs, toUserRs } from "./mapper/auth.mapper";
import { verifyPassword, createAccessToken, getPasswordHash } from "../utils/auth"

export class AuthService {
    private authRepository = new AuthRepository();

    async createAuth(data: Prisma.UsuarioCreateInput): Promise<UsuarioRs> {
        const existingAuth = await this.authRepository.getByEmail(data.correo);
        if (existingAuth) {
            throw new DuplicateResourceError("El correo ya está registrado.");
        }

        const usuario = await this.authRepository.create(data);

        usuario.contraseña = getPasswordHash(usuario.contraseña);

        return toUserRs(usuario);
    }

    async loginAuth(correo: string, contra: string): Promise<AuthLoginRs> {


        const usuario = await this.authRepository.getByEmail(correo);

        if(!usuario){
            throw new BadRequestError("Correo o contraseña incorrectos.");
        }

        if(verifyPassword(contra, usuario.contraseña)){
            throw new BadRequestError("Correo o contraseña incorrectos.")
        }

        const tk_usuario = toUserRs(usuario) 

        const token = createAccessToken(tk_usuario);
        const auth = {
            access_token: token,
            token_type: "bearer",
            usuario: usuario,
        }
        return toAuthLoginRs(auth);
    }

}