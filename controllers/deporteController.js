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

}


export default DeporteController;