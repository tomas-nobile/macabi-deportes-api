import { Router } from "express";
import SocioController from "../controllers/Socio.Controller.js";

const socioController = new SocioController();

const socioRoutes = Router();

socioRoutes.get("/getAll", socioController.getAllSocios);
socioRoutes.get("/:idSocio", socioController.getSocioById);
socioRoutes.get("/getSocioPorDni/:dni", socioController.getSocioPorDni)
socioRoutes.get("/getSocioPorNroSocio/:nroSocio", socioController.getSocioPorNroSocio)
socioRoutes.get("/getSociosPorApellido/:apellido", socioController.getSociosPorApellido)

socioRoutes.post("/asistencias/:idSocio", socioController.getAsistenciasFromSocio); //es post porque tengo que mandar fechas a traves del body
socioRoutes.post("/", socioController.crearSocio);
socioRoutes.post("/noNroSocio", socioController.createSocioAutoNroSocio);

socioRoutes.put("/:idSocio", socioController.updateSocio);

export default socioRoutes