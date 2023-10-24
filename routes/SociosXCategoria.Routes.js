import { Router } from "express";

import SociosXCategoriasController from "../controllers/SociosXCategoriasController.js";


const SociosXCategoriaRoutes = Router();

const sociosXCategoriasController = new SociosXCategoriasController()

SociosXCategoriaRoutes.get("/:idCategoria",sociosXCategoriasController.getDatosSociosCategoria);
SociosXCategoriaRoutes.get("/categorias/:idSocio",sociosXCategoriasController.getCategoriasByIdSocio);


export default SociosXCategoriaRoutes;
