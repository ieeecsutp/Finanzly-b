import { Router } from "express";
import usuarioController from "../usuario/usuario.controller";

const router = Router();

router.use("/usuarios", usuarioController);

export default router;