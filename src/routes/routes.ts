import { Router } from "express";
import usuarioRoutes from "../usuario/usuario.controller"

const router = Router();

router.use("/usuarios", usuarioRoutes);

export default router;