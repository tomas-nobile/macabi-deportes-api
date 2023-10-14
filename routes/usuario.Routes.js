import { Router } from "express";
const usuarioRoutes=Router();
import UsuarioController from "../controllers/Usuario.controller.js";

const userController = new UsuarioController()

usuarioRoutes.post("/", userController.createUser);
usuarioRoutes.get("/getUsers", userController.traerTodosLosUsuarios);
usuarioRoutes.get("/:idUsuario", userController.traerUsuarioPorId);
usuarioRoutes.get("/:idUsuario/deportes", userController.obtenerDeportesPorCoordinador);
usuarioRoutes.get("/:idUsuario/categorias", userController.obtenerCategoriasPorProfesor);

export default usuarioRoutes