import { Router } from "express";
const categoriaRoutes=Router();
import CategoriaController from "../controllers/CategoriaController.js";

const categoriaController = new CategoriaController()


categoriaRoutes.get("/getAll", categoriaController.getAllCategorias);
categoriaRoutes.get("/:idCategoria", categoriaController.getCategoriaById);
categoriaRoutes.get("/:idCategoria/getProfesores", categoriaController.getAllProfesoresCategoria);
categoriaRoutes.get("/:idDeporte/deporte", categoriaController.getCategoriasByIdDeporte);
categoriaRoutes.get("/:idCategoria/nombreCategoria",categoriaController.getNombreCategoria);
categoriaRoutes.get("/:idCategoria/nombreDeporte", categoriaController.getNombreDeporte);

categoriaRoutes.delete("/eliminarProfesores/:idCategoria", categoriaController.eliminarProfesoresCategoria)

categoriaRoutes.post("/:idCategoria/agregarProfesores",categoriaController.agregarProfesACategoriaExistente)
categoriaRoutes.post("/", categoriaController.createCategoria);

categoriaRoutes.put("/:idCategoria", categoriaController.updateCategoria);

categoriaRoutes.delete("/:idCategoria/eliminarCategoria", categoriaController.eliminarCategoria)


//Todos los routers pasaron testing.


export default categoriaRoutes 

