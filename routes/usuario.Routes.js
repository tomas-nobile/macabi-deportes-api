import { Router } from "express";
const usuarioRoutes=Router();
import UsuarioController from "../controllers/Usuario.controller.js";
import validateAccess from "../middleware/validateAccess.js"

const userController = new UsuarioController()
usuarioRoutes.post("/login", userController.logIn);
usuarioRoutes.get("/profesores", userController.getUserProfesores)

usuarioRoutes.use(validateAccess);
usuarioRoutes.get("/me", userController.me);
usuarioRoutes.post("/logout", userController.logout);
usuarioRoutes.post("/", userController.createUser);
usuarioRoutes.get("/getUsers", userController.traerTodosLosUsuarios);
usuarioRoutes.get("/:idUsuario", userController.traerUsuarioPorId);
usuarioRoutes.get("/:idUsuario/deportes", userController.obtenerDeportesPorCoordinador);
usuarioRoutes.get("/:idUsuario/categorias", userController.obtenerCategoriasPorProfesor);
usuarioRoutes.get("/:idRol/rol", userController.traerTodosLosUsuariosXRol);


export default usuarioRoutes;

