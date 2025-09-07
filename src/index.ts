import express from "express";
import cors from "cors";
import { testConnection } from "./lib/prisma";
import routes from "./routes/routes";
import authController from "./auth/auth.controller";
import { errorHandler } from "./utils/error-handler";

if (process.env.NODE_ENV !== "production") {
  process.loadEnvFile?.();
  testConnection();
}

const app = express();
const PORT = process.env.PORT || 4000; // 👈 backend corre en 4000
const AUTHOR = process.env.AUTHOR || "Desconocido";

// Orígenes permitidos (frontend por defecto en 3000)
const allowedOrigins =
  process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(
          new Error("Política de CORS: Acceso denegado desde este origen.")
        );
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Ruta simple de prueba
app.get("/", (_req, res) => {
  res.send("✅ Backend Finanzly corriendo correctamente");
});

// Rutas con prefijo unificado
app.use("/api/v1/auth", authController); // login, registro, etc.
app.use("/api/v1", routes); // resto de rutas

// Middleware de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
