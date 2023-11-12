import { Router } from "express";
import FechaController from "../controllers/Fecha.controller.js"


const fechaRoutes = Router();

const fechaController = new FechaController()

fechaRoutes.get("/getAll", fechaController.getAllFechas)
fechaRoutes.get("/:idCategoria/mostrarFechas", fechaController.getFechasDeCategoria)
fechaRoutes.get("/fechas/:idFecha", fechaController.getDatosFecha)

fechaRoutes.post("/",fechaController.createFecha);

fechaRoutes.patch("/:idFecha", fechaController.patchFechaById)

fechaRoutes.delete("/:idFecha/eliminarFecha", fechaController.eliminarFecha)


export default fechaRoutes;
