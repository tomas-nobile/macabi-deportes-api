import { Router } from "express";
const categoriaRoutes=Router();
import CategoriaController from "../controllers/CategoriaController.js";

const categoriaController = new CategoriaController()

categoriaRoutes.post("/", categoriaController.createCategoria);
categoriaRoutes.put("/:idCategoria", categoriaController.updateCategoria);
categoriaRoutes.get("/getCategories", categoriaController.traerTodasLasCategorias);
categoriaRoutes.get("/:idDeporte/deporte", categoriaController.traerTodasLasCategoriasXIdDeporte);
categoriaRoutes.get("/:idCategoria", categoriaController.traerCategoriaPorId);
categoriaRoutes.get("/:idCategoria",categoriaController.getNombreCategoria);
categoriaRoutes.get("/:idCategoria/nombreDeporte", categoriaController.getNombreDeporte);


export default categoriaRoutes

