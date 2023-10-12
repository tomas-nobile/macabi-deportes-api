import { Router } from "express";
import UsuarioController from "../controllers/Usuario.controller.js";

const userController = new UsuarioController()

const usuarioRoutes = Router();


usuarioRoutes.post("/", userController.createUser);
usuarioRoutes.get("/profesores", userController.getUserProfesores)

export default usuarioRoutes