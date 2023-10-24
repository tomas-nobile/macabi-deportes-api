import { Router } from "express";
import InfoContactoController from "../controllers/InfoContacto.controller.js";

const infoContactoController = new InfoContactoController();

const infoContactoRoutes = Router();

infoContactoRoutes.post("/", infoContactoController.crearContacto);
infoContactoRoutes.get("/getAllContactos", infoContactoController.traerTodosLosContactos);

export default infoContactoRoutes
