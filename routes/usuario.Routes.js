import { Router } from "express";
const userioRoutes=Router();
import UsuarioController from "../controllers/Usuario.controller.js";
import validateAccess from "../middleware/validateAccess.js"

const usuarioController = new UsuarioController()

usuarioRoutes.post("/login", userController.logIn);

usuarioRoutes.use(validateAccess);

usuarioRoutes.get("/me", userController.me);

usuarioRoutes.post("/logout", userController.logout);

userioRoutes.post("/", usuarioController.createUser);


export default userioRoutes;