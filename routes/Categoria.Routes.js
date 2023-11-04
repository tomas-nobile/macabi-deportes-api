import { Router } from "express";
const categoriaRoutes=Router();
import CategoriaController from "../controllers/CategoriaController.js";

const categoriaController = new CategoriaController()


categoriaRoutes.get("/getAll", categoriaController.getAllCategorias);
categoriaRoutes.get("/:idCategoria", categoriaController.getCategoriaById);
categoriaRoutes.get("/:idDeporte/deporte", categoriaController.getCategoriasByIdDeporte);
categoriaRoutes.get("/:idCategoria/nombreCategoria",categoriaController.getNombreCategoria);
categoriaRoutes.get("/:idCategoria/nombreDeporte", categoriaController.getNombreDeporte);

categoriaRoutes.post("/", categoriaController.createCategoria);
categoriaRoutes.put("/:idCategoria", categoriaController.updateCategoria);

//Todos los routers pasaron testing.


export default categoriaRoutes

