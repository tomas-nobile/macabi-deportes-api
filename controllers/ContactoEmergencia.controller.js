import { ContactoEmergencia } from "../models/index.js";

class ContactoEmergenciaController {
  constructor() {}
  crearContacto = async (req, res, next) => {
    try {
      const { nombre, email, telefono, observaciones } = req.body;
      const result = await ContactoEmergencia.create({
        nombre,
        email,
        telefono,
        observaciones,
      });
      if (!result)
        throw new Error("El contacto de emergencia no pudo ser creado");
      res
        .status(200)
        .send({
          success: true,
          message: "Contacto de emergencia creado con exito",
        });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  traerTodosLosContactos = async (req, res, next) => {
    try {
      const result = await ContactoEmergencia.findAll({
        attributes: [
          "idContactoEmergencia",
          "nombre",
          "email",
          "telefono",
          "observaciones",
        ],
      });

      if (result.length == 0) {
        const error = new Error("no hay contactos de emergencia cargados aun");
        error.status = 400;
        throw error;
      }

      res
        .status(200)
        .send({
          success: true,
          message: "contactos de emergencia encontrados:",
          result,
        });
    } catch (error) {
      next(error);
    }
  };

  updateContacto = async (req, res, next) => {
    try {
      const { idContactoEmergencia } = req.params;
      const { nombre, email, telefono, observaciones } = req.body;

      const result = await ContactoEmergencia.update(
        {
          nombre,
          email,
          telefono,
          observaciones,
        },
        {
          where: {
            idContactoEmergencia,
          },
        }
      );

      if (!result)
        throw new Error("No se pudo modificar el contacto de emergencia.");

      res
        .status(200)
        .send({
          success: true,
          message: "Contacto de emergencia modificado con exito",
        });
    } catch (error) {
      next(error);
    }
  };

  eliminarContacto = async (req, res, next) => {
    try {
      const { idContactoEmergencia } = req.params;

      const resultado = await ContactoEmergencia.destroy({
        where: {
            idContactoEmergencia: idContactoEmergencia,
        },
      });

      if (resultado === 1) {
        res
          .status(200)
          .send({
            success: true,
            message: "Contacto de emergencia eliminado exitosamente",
          });
      } else {
        res
          .status(404)
          .send({
            success: false,
            message: "No se encontró el contacto de emergencia para eliminar",
          });
      }
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  };
}

export default ContactoEmergenciaController;
