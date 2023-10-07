import { Router } from "express";
const usuarioRoutes=Router();
import UsuarioController from "../controllers/Usuario.controller.js";

const userController = new UsuarioController()


usuarioRoutes.post("/", userController.createUser);


export default usuarioRoutes