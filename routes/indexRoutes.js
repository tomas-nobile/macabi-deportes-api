//Va a recibir las rutas, las va a empaquetar

import { Router } from "express";
import usuarioRoutes from "./usuario.Routes.js";
import fechaRoutes from "./Fecha.Routes.js";
import asistenciaRoutes from "./Asistencia.Routes.js";
import socioRoutes from "./socio.Routes.js";
import deporteRoutes from "./deporte.Routes.js"
import categoriaRoutes from "./Categoria.Routes.js";
import SociosXCategoriaRoutes from "./SociosXCategoria.Routes.js";

const indexRoutes = Router()

//Ingresar acá la ruta para cada Route.
indexRoutes.use("/usuario", usuarioRoutes);
indexRoutes.use("/asistencia", asistenciaRoutes);
indexRoutes.use("/fecha", fechaRoutes);
indexRoutes.use("/socio", socioRoutes);
indexRoutes.use("/deporte", deporteRoutes);
indexRoutes.use("/categoria",categoriaRoutes)
indexRoutes.use("/sociosXCategoria", SociosXCategoriaRoutes)


export default indexRoutes