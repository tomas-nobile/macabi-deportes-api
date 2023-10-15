import { Router } from "express";
const userioRoutes=Router();
import UsuarioController from "../controllers/Usuario.controller.js";

const usuarioController = new UsuarioController()


userioRoutes.post("/", usuarioController.createUser);


export default userioRoutes;