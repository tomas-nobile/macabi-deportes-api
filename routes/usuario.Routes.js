import { Router } from "express";
import UsuarioController from "../controllers/Usuario.controller.js";

const userController = new UsuarioController()

const usuarioRoutes = Router();


usuarioRoutes.post("/", userController.createUser);

usuarioRoutes.get("/", userController.getAllUsers);
usuarioRoutes.get("/:id", userController.getUserById);

usuarioRoutes.patch("/:id", userController.patchUserById);

usuarioRoutes.delete("/:id", userController.deleteUserById);


export default usuarioRoutes