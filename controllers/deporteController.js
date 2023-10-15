import {Deporte} from "../models/index.js"

class DeporteController {
    constructor() {}

  createDeporte = async (req, res, next) => {
    try {
      const {idDeporte, nombre} = req.body;
      const result = await Deporte.create({
        nombre,
        
        
      });
      if (!result) throw new Error("El Deporte no pudo ser creado");
      res
        .status(200)
        .send({ success: true, message: "Deporte creado con exito" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };


  getAllDeportes = async (req, res, next) => {
    try {
      const result = await Deporte.findAll({
        attributes: ["nombre", "id"],
      });
      if (result.length === 0) {
        const error = new Error("No hay deportes");
        error.status = 400;
        throw error;
      }
      res
        .status(200)
        .send({ success: true, message: "deporte encontrado", result });
    } catch (error) {
      //res.status(400).send({ success: false, message: error.message });
      next(error);
    }
  };


  getDeporteById = async (req, res, next) => {
    try {
      const { nombre } = req.params;
      const result = await Deporte.findOne({
        where: {
          nombre,
        },
        attributes: ["nombre", "idCoordinador"],
      });
      if (!result) throw new Error("no se encontro el deporte");
      res
        .status(200)
        .send({ success: true, message: "deporte encontrado", result });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  getNombreDeporteById = async (idDeporte) => {
    try {
      console.log("El idDeporte que llegí al metodo de nombre es el  " + idDeporte);
      const result = await Deporte.findOne({
        attributes:["nombre"],
        where: {
          idDeporte,
        },
      });
      if (!result) {
        throw new Error("Deporte no encontrado");
      }
      return result.dataValues.nombre
    } catch (error) {
      console.error("Error en getNombreDeporteById:", error);
    }
  };

}






export default DeporteController;