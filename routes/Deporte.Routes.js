import { Router } from "express";
const deporteRoutes=Router();
import DeporteController from "../controllers/deporteController.js";

const deporteController = new DeporteController()

deporteRoutes.post("/", deporteController.createDeporte);
deporteRoutes.get("/getSports", deporteController.traerTodosLosDeportes);
deporteRoutes.get("/:idDeporte", deporteController.traerDeportePorId);

export default deporteRoutes