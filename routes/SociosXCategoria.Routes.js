import { Router } from "express";
import SociosXCategoriasController from "../controllers/SociosXCategoriasController.js";
const SociosXCategoriaRoutes = Router();

const sociosXCategoriasController = new SociosXCategoriasController()

SociosXCategoriaRoutes.get("/:idCategoria",sociosXCategoriasController.getDatosSociosCategoria);
SociosXCategoriaRoutes.post("/:idCategoria",sociosXCategoriasController.agregarSociosACategorias)
SociosXCategoriaRoutes.post("/:idCategoria/agregar",sociosXCategoriasController.agregarSociosACategoriasB)




export default SociosXCategoriaRoutes;
