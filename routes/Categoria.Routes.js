import { Router } from "express";
const categoriaRoutes=Router();
import CategoriaController from "../controllers/CategoriaController.js";

const categoriaController = new CategoriaController()

categoriaRoutes.post("/", categoriaController.createCategoria);
categoriaRoutes.put("/:idCategoria", categoriaController.updateCategoria);
categoriaRoutes.get("/getCategories", categoriaController.traerTodasLasCategorias); //Ya lo arregle, le cambié el result por el res
categoriaRoutes.get("/:idDeporte/deporte", categoriaController.traerTodasLasCategoriasXIdDeporte);
categoriaRoutes.get("/:idCategoria", categoriaController.traerCategoriaPorId);
categoriaRoutes.get("/:idCategoria/nombreCategoria",categoriaController.getNombreCategoria); //Arreglar ruta en el front.
categoriaRoutes.get("/:idCategoria/nombreDeporte", categoriaController.getNombreDeporte); //Arrgeglar la ruta en el front.

//Todos los routers pasaron testing.


export default categoriaRoutes

