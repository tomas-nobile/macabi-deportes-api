import { Router } from "express";
import UsuarioController from "../controllers/Usuario.controller.js";
import validateAccess from "../middleware/validateAccess.js"

const userController = new UsuarioController()

const usuarioRoutes = Router();

// Rutas

usuarioRoutes.post("/login", userController.logIn);

//con necesidad de logueo
usuarioRoutes.use(validateAccess);

usuarioRoutes.get("/me", userController.me);
usuarioRoutes.get("/getUsers", userController.getAllUsers);
usuarioRoutes.get("/:idUsuario", userController.getUserById);
usuarioRoutes.get("/:idUsuario/deportes", userController.getDeportesPorCoordinador);
usuarioRoutes.get("/:idUsuario/categorias", userController.getCategoriasPorProfesor);
usuarioRoutes.get("/:idRol/rol", userController.getUsersByRol);


usuarioRoutes.post("/", userController.createUser);
usuarioRoutes.post("/logout", userController.logout);

usuarioRoutes.put("/:idUsuario", userController.patchUserById);

usuarioRoutes.delete("/:idUsuario", userController.deleteUserById);  


export default usuarioRoutes;
