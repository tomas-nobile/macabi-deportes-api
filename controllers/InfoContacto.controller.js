import {infoContacto} from "../models/index.js";

class InfoContactoController {
  constructor() {}
  crearContacto = async (req, res, next) => {
    try {
      const { idSocio, nombre, apellido, email, telefono } = req.body;
      const result = await infoContacto.create({
        idSocio,
        nombre,
        apellido,
        email,
        telefono,
      });
      if (!result) throw new Error("El contacto no pudo ser creado");
      res
        .status(200)
        .send({ success: true, message: "Contacto creado con exito" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  traerTodosLosContactos = async (req, res, next) => {
    try {
      const result = await infoContacto.findAll({
        attributes: [
          "idInfoContacto",
          "idSocio",
          "nombre",
          "apellido",
          "email",
          "telefono",
        ],
      });

      if (result.length == 0) {
        const error = new Error("no hay contactos cargados aun");
        error.status = 400;
        throw error;
      }

      res
        .status(200)
        .send({ success: true, message: "contactos encontrados:", result });
    } catch (error) {
      next(error);
    }
  };
}

export default InfoContactoController;
