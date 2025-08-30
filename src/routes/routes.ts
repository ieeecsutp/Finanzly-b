import { Router } from "express";
import usuarioRoutes from "../usuario/usuario.controller"
import authRoutes from "../auth/auth.controller"

const router = Router();

router.use("/usuarios", usuarioRoutes);
router.use("/auth", authRout

export default router;