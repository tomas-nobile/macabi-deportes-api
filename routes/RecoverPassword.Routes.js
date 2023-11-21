import { Router } from "express";
import RecoverPasswordController from "../controllers/RecoverPassword.Controller.js";

const recoverController = new RecoverPasswordController()

const recoverPasswordRoutes = Router();

// Rutas

recoverPasswordRoutes.post("/", recoverController.recoverPassword);
recoverPasswordRoutes.post("/sendEmail", recoverController.sendEmailForRecoverPassword);


export default recoverPasswordRoutes;