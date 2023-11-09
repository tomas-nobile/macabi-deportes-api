//Va a recibir las rutas, las va a empaquetar

import { Router } from "express";
import usuarioRoutes from "./usuario.Routes.js";
import asistenciaRoutes from "./Asistencia.Routes.js";
import fechaRoutes from "./Fecha.Routes.js";
import socioRoutes from "./socio.Routes.js";
import deporteRoutes from "./Deporte.Routes.js";
import categoriaRoutes from "./Categoria.Routes.js";
import SociosXCategoriaRoutes from "./SociosXCategoria.Routes.js";
import infoContactoRoutes from "./infoContacto.routes.js";
import contactoEmergenciaRoutes from "./ContactoEmergencia.Routes.js";

const indexRoutes = Router()

//Ingresar acá la ruta para cada Route.
indexRoutes.use("/usuario", usuarioRoutes);
indexRoutes.use("/asistencia", asistenciaRoutes);
indexRoutes.use("/fecha", fechaRoutes);
indexRoutes.use("/socio", socioRoutes);
indexRoutes.use("/deporte", deporteRoutes);
indexRoutes.use("/categoria",categoriaRoutes)
indexRoutes.use("/sociosXCategoria", SociosXCategoriaRoutes)
indexRoutes.use("/contacto", infoContactoRoutes)
indexRoutes.use("/contactoEmergencia", contactoEmergenciaRoutes)





export default indexRoutes
