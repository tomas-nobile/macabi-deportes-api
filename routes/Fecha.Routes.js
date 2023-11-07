import { Router } from "express";
import FechaController from "../controllers/Fecha.controller.js"


const fechaRoutes = Router();

const fechaController = new FechaController()


fechaRoutes.post("/",fechaController.createFecha);
fechaRoutes.get("/fechas", fechaController.getAllFechas)
fechaRoutes.get("/:idCategoria/mostrarFechas", fechaController.getFechasDeCategoria)
fechaRoutes.get("/fechas/:idFecha", fechaController.getDatosFecha)
fechaRoutes.patch("/:idFecha", fechaController.patchFechaById)
fechaRoutes.delete("/:idFecha/eliminarFecha", fechaController.eliminarFecha)


export default fechaRoutes;
