import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Usuario } from "./entities/Usuario";
import { Rol } from "./entities/Rol";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(async () => {
    console.log("Database conectado");
    app.get('/', (req, res) => {
      res.send('API está funcionando 🚀');
    });

    app.post("/roles", async (req, res) => {
      const rol = new Rol();
      rol.nombre = req.body.nombre;
      await AppDataSource.manager.save(rol);
      res.json(rol);
    });
    app.post("/usuarios", async (req, res) => {
      const { nombres, apellidos, usuario, correo, contraseña, rolId } = req.body;
      const rol = await AppDataSource.manager.findOneBy(Rol,  { id: rolId });
      if (!rol) {
        return res.status(404).json({ message: "Rol no encontrado" });
      }

      const nuevoUsuario = new Usuario();
      nuevoUsuario.nombres = nombres;
      nuevoUsuario.apellidos = apellidos;
      nuevoUsuario.usuario = usuario;
      nuevoUsuario.correo = correo;
      nuevoUsuario.contraseña = contraseña;
      nuevoUsuario.rol = rol;

      try {
        await AppDataSource.manager.save(nuevoUsuario);
        res.json(nuevoUsuario);
      } catch (error) {
        res.status(400).json({ message: "Error al crear el usuario" });
      }
      
    });

    app.listen(3000, () => {
      console.log("Servidor corriendo en http://localhost:3000");
    });
  })
  .catch((err) => console.error(err));