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
deporteRoutes.post("/:idDeporte/agregarCoordinadores",deporteController.agregarCoordinadoresADeporteExistente)

deporteRoutes.delete("/:idDeporte", deporteController.deleteCoordinadoresXDeporte);

export default deporteRoutes