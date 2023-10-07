import {Categoria} from "../models/index.js"

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

}


export default CategoriaController;