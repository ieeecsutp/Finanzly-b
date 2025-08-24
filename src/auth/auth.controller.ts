import { Router, Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { ApiResponse } from "../utils/api-response";

const router = Router();
const authService = new AuthService();

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { correo, contraseña } = req.body;
    if (!correo || !contraseña) {
      return res.status(400).json({ status: "error", message: "Correo y contraseña son obligatorios" } as ApiResponse<null>);
    }

    const result = await authService.login(correo, contraseña);
    const response: ApiResponse<any> = {
      status: "success",
      message: "Autenticación correcta",
      data: result,
    };
    res.json(response);
  } catch (err) {
    next(err);
  }
});

export default router;