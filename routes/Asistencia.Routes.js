import { Router } from "express";
import AsistenciaController  from "../controllers/Asistencia.controller.js";

const asistenciaRoutes = Router();

const asistenciaController = new AsistenciaController()

asistenciaRoutes.post("/",asistenciaController.createAsistencia);
asistenciaRoutes.get("/:idFecha",asistenciaController.getAsistenciaFecha);


export default asistenciaRoutes;
