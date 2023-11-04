import { Router } from "express";
import InfoContactoController from "../controllers/InfoContacto.controller.js";

const infoContactoController = new InfoContactoController();

const infoContactoRoutes = Router();

infoContactoRoutes.post("/", infoContactoController.crearContacto);

infoContactoRoutes.get("/getAllContactos", infoContactoController.traerTodosLosContactos); // creo q no se usa ya

infoContactoRoutes.put("/:idInfoContacto", infoContactoController.updateContacto);

infoContactoRoutes.delete("/:idInfoContacto", infoContactoController.eliminarContacto);

export default infoContactoRoutes
