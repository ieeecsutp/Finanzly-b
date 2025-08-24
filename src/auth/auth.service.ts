import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UsuarioRepository } from "../usuario/usuario.repository";
import { toUserDetailRs } from "../usuario/mapper/usuario.mapper";
import { UnauthorizedError } from "../utils/error-types";

const usuarioRepo = new UsuarioRepository();

export class AuthService {
  async login(correo: string, password: string) {
    const usuario = await usuarioRepo.getByEmail(correo);
    console.log("auth.login: correo recibido =", correo, "usuario encontrado =", !!usuario);

    if (!usuario) throw new UnauthorizedError("Credenciales inválidas");

    // Ajusta según cómo se llame el campo en tu modelo (contraseña / contrasena / password)
    const stored = (usuario as any).contraseña ?? (usuario as any).contrasena ?? (usuario as any).password;
    console.log("auth.login: stored password present:", !!stored, "type:", typeof stored, "len:", stored?.length ?? 0);

    if (!stored) throw new UnauthorizedError("Credenciales inválidas");

    // Soporta hash bcrypt o texto plano (solo para debug; eliminar en producción)
    const isHashed = typeof stored === "string" && stored.startsWith("$2");
    let valid = false;
    if (isHashed) {
      valid = await bcrypt.compare(password, stored);
    } else {
      valid = password === stored;
    }
    console.log("auth.login: isHashed:", isHashed, "compare result:", valid);

    if (!valid) throw new UnauthorizedError("Credenciales inválidas");

    const payload = { sub: usuario.idUsuario, email: usuario.correo };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "dev_secret", {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    return {
      token,
      user: toUserDetailRs(usuario),
    };
  }
}