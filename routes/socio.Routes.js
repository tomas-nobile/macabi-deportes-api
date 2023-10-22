import { Router } from "express";
import SocioController from "../controllers/Socio.Controller.js";

const socioController = new SocioController();

const socioRoutes = Router();

socioRoutes.post("/", socioController.crearSocio )
socioRoutes.get("/getSocioPorDni/:dni", socioController.getSocioPorDni)
socioRoutes.get("/getSocioPorNroSocio/:nroSocio", socioController.getSocioPorNroSocio)





export default socioRoutes