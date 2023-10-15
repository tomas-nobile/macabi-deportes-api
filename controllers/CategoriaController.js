import {Categoria} from "../models/index.js"
import DeporteController from "./deporteController.js";
class CategoriaController{
    constructor() {}

  createCategoria = async (req, res, next) => {
    try {
      const {
        nombre,
        nombreDeporte,
        idProfesor
      } = req.body;
      const result = await Categoria.create({
        nombre,
        nombreDeporte,
        idProfesor
      });
      if (!result) throw new Error("La categoria no pudo ser creado");
      res
        .status(200)
        .send({ success: true, message: "Categoria creado con exito" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  getNombreCategoria = async (req, res, next) => {
    try {
      const {
        idCategoria
      } = req.params;
      const result = await Categoria.findOne({
        attributes:["nombreCategoria"],
        where:{
          idCategoria
        },
      });
      if (!result) throw new Error("Error en la busqueda de categoria");
      res
        .status(200)
        .json({ nombreCategoria: result.nombreCategoria });
      }catch(e){
    res.status(400).send({ success: false, message: e.message });

  }

}

getNombreDeporte = async (req, res, next) => {
  try {
    const { idCategoria } = req.params;
    console.log("El id categoria que llega es el: " + idCategoria);
    const result = await Categoria.findOne({
      attributes: ["idDeporte"],
      where: {
        idCategoria
      },
    });
    console.log("Termino la consulta");
    if (!result) {
      console.log("No encontró ningun idDeporte");

      throw new Error("Error en la búsqueda del idDeporte de la categoría");
    }
    console.log("El id del deporte es el " + result.dataValues.idDeporte);
    let deporte1 = new DeporteController();
    const nombreDeporte = await deporte1.getNombreDeporteById(result.dataValues.idDeporte)
    console.log("El nombre del deporte es: " +nombreDeporte);
    res.status(200).json({ nombreCategoria: nombreDeporte});
  } catch (e) {
    console.error("Error en getNombreDeporte:", e);
    res.status(400).json({ success: false, message: e.message });
  }
}

}


export default CategoriaController;