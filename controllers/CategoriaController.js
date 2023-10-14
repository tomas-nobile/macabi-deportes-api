import { Categoria } from "../models/index.js"

class CategoriaController {
    constructor() {}

  createCategoria = async (req, res, next) => {
    try {
      const {
        nombreCategoria,
        idDeporte,
        idUsuario
      } = req.body;
      const result = await Categoria.create({
        nombreCategoria,
        idDeporte,
        idUsuario
      });
      if (!result) throw new Error("La categoria no pudo ser creada");
      res
        .status(200)
        .send({ success: true, message: "Categoria creada con exito" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  traerCategoriaPorId = async (req, res, next) => {
    try {
      const { idCategoria } = req.params;

      const result = await Categoria.findOne({
        where: {
          idCategoria,
        },
        attributes: ["idCategoria", "nombreCategoria", "idDeporte", "idUsuario"],
      });

      if (!result) {
        const error = new Error(
          `la categoria con ID ${idCategoria} no se encuentra en la base de datos`
        );
        error.status = 400;
        throw error;
      }

      res
        .status(200)
        .send({ success: true, message: "categorias encontradas:", result });
    } catch (error) {
      next(error);
    }
  };

  traerTodasLasCategorias = async (req, res, next) => {
    try {
      const result = await Categoria.findAll({
        attributes: ["idCategoria", "nombreCategoria", "idDeporte", "idUsuario"],
      });

      if (result.length == 0) {
        const error = new Error("no hay categorias cargadas aun");
        error.status = 400;
        throw error;
      }

      res
        .status(200)
        .send({ success: true, message: "categorias encontradas:", result });
    } catch (error) {
      next(error);
    }
  };

}

export default CategoriaController;