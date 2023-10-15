import { Router } from "express";
import CategoriaController from "../controllers/CategoriaController.js";


const categoriaRoutes = Router();

const categoriaController = new CategoriaController()

categoriaRoutes.get("/:idCategoria",categoriaController.getNombreCategoria);
categoriaRoutes.get("/:idCategoria/deporte", categoriaController.getNombreDeporte);



export default categoriaRoutes;
