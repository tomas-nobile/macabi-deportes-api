import { Router } from "express";
import DeporteController  from "../controllers/deporteController.js";

const deporteRoutes = Router();
const deporteController = new DeporteController()

deporteRoutes.post("/",deporteController.createDeporte);
deporteRoutes.get("/deportes", deporteController.getAllDeportes)

export default deporteRoutes;