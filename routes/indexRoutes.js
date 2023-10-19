//Va a recibir las rutas, las va a empaquetar

import { Router } from "express";
import usuarioRoutes from "./usuario.Routes.js";
import fechaRoutes from "./Fecha.Routes.js";
import asistenciaRoutes from "./Asistencia.Routes.js";
import deporteRoutes from "./Deporte.Routes.js";
import socioRoutes from "./socio.routes.js";
import categoriaRoutes from "./Categoria.Routes.js";
import SociosXCategoriaRoutes from "./SociosXCategoria.Routes.js";

const indexRoutes = Router()

indexRoutes.use("/usuarios", usuarioRoutes);
indexRoutes.use("/asistencia", asistenciaRoutes);
indexRoutes.use("/fecha", fechaRoutes);
indexRoutes.use("/socio", socioRoutes);
indexRoutes.use("/deporte", deporteRoutes);
indexRoutes.use("/categoria",categoriaRoutes)
indexRoutes.use("/sociosXCategoria", SociosXCategoriaRoutes)
indexRoutes.use("/profesores", usuarioRoutes);

export default indexRoutes
