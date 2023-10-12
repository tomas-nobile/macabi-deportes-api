import { Router } from "express";
import CategoriaController  from "../controllers/CategoriaController.js";

const categoriaRoutes = Router();
const categoriaController = new CategoriaController()

categoriaRoutes.post("/",categoriaController.createCategoria);

export default categoriaRoutes;