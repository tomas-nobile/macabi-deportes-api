import { Router } from "express";
const deporteRoutes=Router();
import DeporteController from "../controllers/deporteController.js";

const deporteController = new DeporteController()

deporteRoutes.get("/getSports", deporteController.getAllDeportes);
deporteRoutes.get("/:idDeporte", deporteController.getDeporteById);
deporteRoutes.get("/:idDeporte/coordinadores", deporteController.getCoordinadoresXDeporte);
deporteRoutes.get("/tablaIntermedia/:idDeporte", deporteController.traerIdCoordinadorTablaIntermedia);

deporteRoutes.post("/", deporteController.createDeporte);

deporteRoutes.put("/:idDeporte", deporteController.updateDeporte);
deporteRoutes.put("/:idDeporte/", deporteController.updateCoordinador);

deporteRoutes.delete("/:idDeporte", deporteController.deleteCoordinadoresXDeporte);

export default deporteRoutes