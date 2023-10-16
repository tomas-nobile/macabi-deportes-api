import { Router } from "express";
import SocioController from "../controllers/Socio.Controller.js";

const socioController = new SocioController();

const socioRoutes = Router();

socioRoutes.post("/", socioController.crearSocio )


export default socioRoutes