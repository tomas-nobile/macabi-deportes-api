//Va a recibir las rutas, las va a empaquetar
import { Router } from "express";
import usuarioRoutes from "./usuario.Routes.js";
import fechaRoutes from "./Fecha.Routes.js";
import asistenciaRoutes from "./Asistencia.Routes.js";
<<<<<<< HEAD
import deporteRoutes from "./deporteRoutes.js"
=======
import socioRoutes from "./socio.Routes.js";
>>>>>>> 326df67baf1452715142376621b295c516078389

const indexRoutes=Router()

//Ingresar acá la ruta para cada Route.
indexRoutes.use("/usuario", usuarioRoutes);
indexRoutes.use("/asistencia", asistenciaRoutes);
indexRoutes.use("/fecha", fechaRoutes);
<<<<<<< HEAD
indexRoutes.use("/deporte", deporteRoutes);
=======
indexRoutes.use("/socio", socioRoutes);

>>>>>>> 326df67baf1452715142376621b295c516078389


export default indexRoutes