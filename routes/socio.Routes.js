import { Router } from "express";
import SocioController from "../controllers/Socio.Controller.js";

const socioController = new SocioController();

const socioRoutes = Router();

socioRoutes.get("/getSocios", socioController.traerTodosLosSocios);
socioRoutes.get("/:idSocio", socioController.traerSocioPorId);
socioRoutes.get("/getSocioPorDni/:dni", socioController.getSocioPorDni)
socioRoutes.get("/getSocioPorNroSocio/:nroSocio", socioController.getSocioPorNroSocio)
socioRoutes.get("/getSociosPorApellido/:apellido", socioController.getSociosPorApellido)


socioRoutes.post("/", socioController.crearSocio);
socioRoutes.post("/noNroSocio", socioController.createSocioAutoNroSocio);

socioRoutes.put("/:idSocio", socioController.updateSocio);

export default socioRoutes