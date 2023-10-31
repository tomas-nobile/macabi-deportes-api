import { Router } from "express";
const ContactoEmergenciaRoutes = Router();
import ContactoEmergenciaController from "../controllers/ContactoEmergencia.controller.js";

const contactoEmergenciaController = new ContactoEmergenciaController()

ContactoEmergenciaRoutes.get("/getAll", contactoEmergenciaController.traerTodosLosContactos);

ContactoEmergenciaRoutes.post("/", contactoEmergenciaController.crearContacto);

ContactoEmergenciaRoutes.put("/:idContactoEmergencia", contactoEmergenciaController.updateContacto);

ContactoEmergenciaRoutes.delete("/:idContactoEmergencia", contactoEmergenciaController.eliminarContacto);

export default ContactoEmergenciaRoutes