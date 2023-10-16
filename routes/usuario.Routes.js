import { Router } from "express";
const usuarioRoutes=Router();
import UsuarioController from "../controllers/Usuario.controller.js";
import validateAccess from "../middleware/validateAccess.js"

const userController = new UsuarioController()
usuarioRoutes.post("/login", userController.logIn);

usuarioRoutes.use(validateAccess);
usuarioRoutes.get("/me", userController.me);
usuarioRoutes.post("/logout", userController.logout);
usuarioRoutes.post("/", userController.createUser);
usuarioRoutes.get("/getUsers", userController.traerTodosLosUsuarios);
usuarioRoutes.get("/:idUsuario", userController.traerUsuarioPorId);
usuarioRoutes.get("/:idUsuario/deportes", userController.obtenerDeportesPorCoordinador);
usuarioRoutes.get("/:idUsuario/categorias", userController.obtenerCategoriasPorProfesor);
usuarioRoutes.get("/:idRol/rol", userController.traerTodosLosUsuariosXRol);
usuarioRoutes.get("/profesores", userController.getUserProfesores)

usuarioRoutes.get("/", userController.getAllUsers);
usuarioRoutes.get("/:id", userController.getUserById);

usuarioRoutes.patch("/:id", userController.patchUserById);

usuarioRoutes.delete("/:id", userController.deleteUserById);


export default usuarioRoutes;

