import { Router } from "express";

import SociosXCategoriasController from "../controllers/SociosXCategoriasController.js";


const SociosXCategoriaRoutes = Router();

const sociosXCategoriasController = new SociosXCategoriasController()

SociosXCategoriaRoutes.get("/:idCategoria",sociosXCategoriasController.getDatosSociosCategoria);
SociosXCategoriaRoutes.get("/categorias/:idSocio",sociosXCategoriasController.getCategoriasByIdSocio);
SociosXCategoriaRoutes.post("/:idCategoria",sociosXCategoriasController.agregarSociosACategorias)//No lo usariamos
SociosXCategoriaRoutes.post("/:idCategoria/agregar",sociosXCategoriasController.agregarSociosACategoriasB)
SociosXCategoriaRoutes.delete("/:idCategoria/:idSocio/eliminarDeCategoria", sociosXCategoriasController.deleteSocioById)







export default SociosXCategoriaRoutes;
