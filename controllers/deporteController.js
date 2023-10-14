import {Deporte} from "../models/index.js"

class DeporteController {
    constructor() {}

  createDeporte = async (req, res, next) => {
    try {
      const {
        nombre,
        idCoordinador
      } = req.body;
      const result = await Deporte.create({
        nombre,
        idCoordinador
      });
      if (!result) throw new Error("El Deporte no pudo ser creado");
      res
        .status(200)
        .send({ success: true, message: "Deporte creado con exito" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  traerDeportePorId = async (req, res, next) => {
    try {
      const { idDeporte } = req.params;

      const result = await Deporte.findOne({
        where: {
          idDeporte,
        },
        attributes: ["idDeporte", "nombre"],
      });

      if (!result) {
        const error = new Error(
          `el deporte con ID ${idDeporte} no se encuntra en la base de datos`
        );
        error.status = 400;
        throw error;
      }

      res
        .status(200)
        .send({ success: true, message: "deportes encontrados:", result });
    } catch (error) {
      next(error);
    }
  };

  traerTodosLosDeportes = async (req, res, next) => {
    try {
      const result = await Deporte.findAll({
        attributes: [
          "idDeporte",
          "nombre",
        ],
      });

      if (result.length == 0) {
        const error = new Error("no hay deportes cargados aun");
        error.status = 400;
        throw error;
      }

      res
        .status(200)
        .send({ success: true, message: "deportes encontrados:", result });
    } catch (error) {
      next(error);
    }
  };

}


export default DeporteController;