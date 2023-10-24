//Va a recibir las rutas, las va a empaquetar

import { Router } from "express";
import usuarioRoutes from "./usuario.Routes.js";
import asistenciaRoutes from "./Asistencia.Routes.js";
<<<<<<< HEAD
import fechaRoutes from "./Fecha.Routes.js";
import socioRoutes from "./socio.Routes.js";
import deporteRoutes from "./deporte.Routes.js";
=======
import deporteRoutes from "./Deporte.Routes.js";
import socioRoutes from "./socio.routes.js";
>>>>>>> origin/JuampiSrint2
import categoriaRoutes from "./Categoria.Routes.js";
import SociosXCategoriaRoutes from "./SociosXCategoria.Routes.js";
import infoContactoRoutes from "./infoContacto.routes.js";

const indexRoutes = Router()

<<<<<<< HEAD
//Ingresar acá la ruta para cada Route.
indexRoutes.use("/usuario", usuarioRoutes);
=======
indexRoutes.use("/usuarios", usuarioRoutes);
>>>>>>> origin/JuampiSrint2
indexRoutes.use("/asistencia", asistenciaRoutes);
indexRoutes.use("/fecha", fechaRoutes);
indexRoutes.use("/socio", socioRoutes);
indexRoutes.use("/deporte", deporteRoutes);
indexRoutes.use("/categoria",categoriaRoutes)
indexRoutes.use("/sociosXCategoria", SociosXCategoriaRoutes)
<<<<<<< HEAD




=======
indexRoutes.use("/profesores", usuarioRoutes);
indexRoutes.use("/contacto", infoContactoRoutes)
>>>>>>> origin/JuampiSrint2

export default indexRoutes
