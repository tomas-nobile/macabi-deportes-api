//Va a recibir las rutas, las va a empaquetar
import { Router } from "express";
import userRoutes from "./InfoUsuario.routes.js";
const indexRoutes=Router()

indexRoutes.use("/usuario", userRoutes);



export default indexRoutes