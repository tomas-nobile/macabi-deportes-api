//Va a recibir las rutas, las va a empaquetar
import { Router } from "express";
import userRoutes from "./InfoUsuario.routes.js";
import fechaRoutes from "./Fecha.Routes.js";
import asistenciaRoutes from "./Asistencia.Routes.js";

const indexRoutes=Router()

indexRoutes.use("/usuario", userRoutes);

indexRoutes.use("/asistencia", asistenciaRoutes);

indexRoutes.use("/fecha", fechaRoutes);



export default indexRoutes