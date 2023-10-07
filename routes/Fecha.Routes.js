import { Router } from "express";
import FechaController from "../controllers/Fecha.controller.js"

const fechaRoutes = Router();

const fechaController = new FechaController()


fechaRoutes.post("/",fechaController.createFecha);


export default fechaRoutes;