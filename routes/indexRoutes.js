//Va a recibir las rutas, las va a empaquetar

import { Router } from "express";
import usuarioRoutes from "./usuario.Routes.js";
import fechaRoutes from "./Fecha.Routes.js";
import asistenciaRoutes from "./Asistencia.Routes.js";
import socioRoutes from "./socio.Routes.js";
import deporteRoutes from "./deporte.Routes.js"

const indexRoutes = Router()

//Ingresar acá la ruta para cada Route.
indexRoutes.use("/usuarios", usuarioRoutes);
indexRoutes.use("/asistencia", asistenciaRoutes);
indexRoutes.use("/fecha", fechaRoutes);
indexRoutes.use("/socio", socioRoutes);
indexRoutes.use("/deporte", deporteRoutes);


export default indexRoutes