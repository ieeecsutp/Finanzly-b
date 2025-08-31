import { Router } from "express";
import authController from "../auth/auth.controller";
import usuarioController from "../usuario/usuario.controller";
import registroController from "../registro/registro.controller";
import categoriaController from "../categoria/categoria.controller";

const router = Router();

router.use("/auth", authController)
router.use("/usuarios", usuarioController);
router.use("/registros", registroController);
router.use("/categorias", categoriaController);

export default router;