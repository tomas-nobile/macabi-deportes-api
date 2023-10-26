import { Router } from "express";
import SocioController from "../controllers/Socio.Controller.js";

const socioController = new SocioController();

const socioRoutes = Router();

socioRoutes.post("/", socioController.crearSocio);
socioRoutes.get("/getSocios", socioController.traerTodosLosSocios);
socioRoutes.get("/:idSocio", socioController.traerSocioPorId);
socioRoutes.put("/:idSocio", socioController.updateSocio);
socioRoutes.get("/getSocioPorDni/:dni", socioController.getSocioPorDni)
socioRoutes.get("/getSocioPorNroSocio/:nroSocio", socioController.getSocioPorNroSocio)
export default socioRoutes
