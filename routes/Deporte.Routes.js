import { Router } from "express";
const deporteRoutes=Router();
import DeporteController from "../controllers/deporteController.js";

const deporteController = new DeporteController()

deporteRoutes.get("/getAll", deporteController.getAllDeportes);
deporteRoutes.get("/:idDeporte", deporteController.getDeporteById);
deporteRoutes.get("/:idDeporte/coordinadores", deporteController.getCoordinadoresXDeporte);
deporteRoutes.get("/tablaIntermedia/:idDeporte", deporteController.traerIdCoordinadorTablaIntermedia);

deporteRoutes.post("/", deporteController.createDeporte);

deporteRoutes.put("/:idDeporte", deporteController.updateDeporte);
deporteRoutes.put("/:idDeporte/coordinador", deporteController.updateCoordinador);

deporteRoutes.delete("/:idDeporte", deporteController.deleteCoordinadoresXDeporte);
//Hay q arreglar para eliminar a uno solo de los coordinadores?
export default deporteRoutes