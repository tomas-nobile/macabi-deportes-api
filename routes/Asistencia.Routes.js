import { Router } from "express";
import AsistenciaController  from "../controllers/Asistencia.controller.js";

const asistenciaRoutes = Router();

const asistenciaController = new AsistenciaController()

asistenciaRoutes.post("/",asistenciaController.createAsistencia);
asistenciaRoutes.get("/:idFecha",asistenciaController.getAsistenciaFecha);
asistenciaRoutes.delete("/:idFecha",asistenciaController.borrarSocioFecha);


export default asistenciaRoutes;
