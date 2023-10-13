import { Router } from "express";
import UsuarioController from "../controllers/Usuario.controller.js";
import validateAccess from "../middleware/validateAccess.js"

const userController = new UsuarioController()

const usuarioRoutes = Router();

usuarioRoutes.post("/login", userController.logIn);

usuarioRoutes.use(validateAccess);

usuarioRoutes.get("/me", userController.me);

usuarioRoutes.post("/logout", userController.logout);

usuarioRoutes.post("/", userController.createUser);


export default usuarioRoutes