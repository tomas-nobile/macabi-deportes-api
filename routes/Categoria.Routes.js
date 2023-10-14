import { Router } from "express";
const categoriaRoutes=Router();
import CategoriaController from "../controllers/CategoriaController.js";

const categoriaController = new CategoriaController()

categoriaRoutes.post("/", categoriaController.createCategoria);
categoriaRoutes.get("/getCategories", categoriaController.traerTodasLasCategorias);
categoriaRoutes.get("/:idCategoria", categoriaController.traerCategoriaPorId);

export default categoriaRoutes