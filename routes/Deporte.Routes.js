import { Router } from "express";
const deporteRoutes=Router();
import DeporteController from "../controllers/deporteController.js";

const deporteController = new DeporteController()

deporteRoutes.post("/", deporteController.createDeporte);
deporteRoutes.put("/:idDeporte", deporteController.updateDeporte);
deporteRoutes.put("/coordinador/:idDeporte", deporteController.updateCoordinador);
deporteRoutes.get("/getSports", deporteController.traerTodosLosDeportes);
deporteRoutes.get("/:idDeporte", deporteController.traerDeportePorId);
deporteRoutes.get("/:idDeporte/coordinadores", deporteController.traerCoordinadoresXDeporte);
deporteRoutes.get("/tablaIntermedia/:idDeporte", deporteController.traerIdCoordinadorTablaIntermedia);
deporteRoutes.delete("/:idDeporte", deporteController.deleteCoordinadoresXDeporte);

export default deporteRoutes