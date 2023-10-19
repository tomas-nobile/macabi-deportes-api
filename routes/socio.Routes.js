import { Router } from "express";
import SocioController from "../controllers/Socio.Controller.js";

const socioController = new SocioController();

const socioRoutes = Router();

socioRoutes.post("/", socioController.crearSocio )
socioRoutes.get("/getSocioPorDni", socioController.getSocioPorDni)
socioRoutes.get("/getSocioPorNroSocio", socioController.getSocioPorNroSocio)





export default socioRoutes