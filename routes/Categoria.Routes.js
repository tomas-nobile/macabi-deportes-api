import { Router } from "express";
const categoriaRoutes=Router();
import CategoriaController from "../controllers/CategoriaController.js";

const categoriaController = new CategoriaController()


categoriaRoutes.get("/getAll", categoriaController.getAllCategorias); //Ya lo arregle, le cambié el result por el res
categoriaRoutes.get("/:idCategoria", categoriaController.getCategoriaById);
categoriaRoutes.get("/:idDeporte/deporte", categoriaController.getCategoriasByIdDeporte);
categoriaRoutes.get("/:idCategoria/nombreCategoria",categoriaController.getNombreCategoria); //Arreglar ruta en el front.
categoriaRoutes.get("/:idCategoria/nombreDeporte", categoriaController.getNombreDeporte); //Arrgeglar la ruta en el front.

categoriaRoutes.post("/", categoriaController.createCategoria);

categoriaRoutes.put("/:idCategoria", categoriaController.updateCategoria);

//Todos los routers pasaron testing.


export default categoriaRoutes

