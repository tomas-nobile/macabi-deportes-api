import { Router } from "express";
const userRoutes=Router();
import InfoUsuarioController from "../controllers/InfoUsuario.controller.js";

const userController = new InfoUsuarioController()


userRoutes.post("/", userController.createUser);


export default userRoutes;