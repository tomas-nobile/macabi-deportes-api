import { Socio, Fecha, infoContacto } from "../models/index.js";
import { formatEmail } from "../utils/formaters.js";
import { Op } from "sequelize";
class SocioController {
  constructor() { }

  crearSocio = async (req, res, next) => {
    try {
      const {
        nroSocio,
        nombre,
        apellido,
        dni,
        email,
        telefono,
        direccion,
        fechaNacimiento,
        observaciones,
      } = req.body;

      let emailFormated = formatEmail(email);

      const result = await Socio.create({
        nroSocio,
        nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase(),
        apellido:
          apellido.charAt(0).toUpperCase() + apellido.slice(1).toLowerCase(),
        dni,
        email: emailFormated,
        telefono,
        direccion,
        fechaNacimiento,
        observaciones,
      });

      if (!result) throw new Error("El socio no pudo ser creado");

      res
        .status(200)
        .send({ success: true, message: "Socio creado con exito", result });
    } catch (error) {
      next(error);
    }
  };

  createSocioAutoNroSocio = async (req, res, next) => {
    try {
      const {
        nombre,
        apellido,
        dni,
        email,
        telefono,
        direccion,
        fechaNacimiento,
        observaciones,
      } = req.body;

      let emailFormated = formatEmail(email);

      const maxNroSocio = await Socio.max('nroSocio');

      const nuevoNroSocio = maxNroSocio !== null ? maxNroSocio + 1 : 1;

      const result = await Socio.create({
        nroSocio: nuevoNroSocio,
        nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase(),
        apellido:
          apellido.charAt(0).toUpperCase() + apellido.slice(1).toLowerCase(),
        dni,
        email: emailFormated,
        telefono,
        direccion,
        fechaNacimiento,
        observaciones,
      });

      if (!result) throw new Error("El socio no pudo ser creado");

      res
        .status(200)
        .send({ success: true, message: "Socio creado con exito", result });
    } catch (error) {
      next(error);
    }
  };

  getSocioById = async (req, res, next) => {
    try {
      const { idSocio } = req.params;

      const result = await Socio.findOne({
        where: {
          idSocio,
        },
        attributes: [
          "idSocio",
          "nroSocio",
          "nombre",
          "apellido",
          "dni",
          "email",
          "telefono",
          "direccion",
          "fechaNacimiento",
          "observaciones",
        ],
        include: [
          {
            model: infoContacto,
            attributes: [
              "idInfoContacto",
              "idSocio",
              "nombre",
              "apellido",
              "email",
              "telefono",
            ],
          },
        ],
      });

      if (!result) {
        const error = new Error(
          `el socio con ID ${idSocio} no se encuentra en la base de datos`
        );
        error.status = 400;
        throw error;
      }

      res
        .status(200)
        .send({ success: true, message: "socios encontrados:", result });
    } catch (error) {
      next(error);
    }
  };

  getAllSocios = async (req, res, next) => {
    try {
      const result = await Socio.findAll({
        attributes: [
          "idSocio",
          "nroSocio",
          "nombre",
          "apellido",
          "dni",
          "email",
          "telefono",
          "direccion",
          "fechaNacimiento",
          "observaciones",
        ],
        include: [
          {
            model: infoContacto,
            attributes: [
              "idInfoContacto",
              "idSocio",
              "nombre",
              "apellido",
              "email",
              "telefono",
            ],
          },
        ],
      });

      if (result.length == 0) {
        const error = new Error("no hay socios cargados aun");
        error.status = 400;
        throw error;
      }

      res
        .status(200)
        .send({ success: true, message: "socios encontrados:", result });
    } catch (error) {
      next(error);
    }
  };

  patchSocioByiD = async (req, res, next) => {
    try {

      const { idSocio } = req.params;

      const {
        nombre,
        apellido,
        dni,
        email,
        telefono,
        direccion,
        fechaNacimiento,
        observaciones,
      } = req.body;

      const result = await Socio.update(
        {
          nombre,
          apellido,
          dni,
          email,
          telefono,
          direccion,
          fechaNacimiento,
          observaciones,
        },
        {
          where: {
            idSocio: idSocio,
          },
        }
      );

      if (!result) throw new Error("No se pudo modificar el sociop.");

      res
        .status(200)
        .send({ success: true, message: "Socio modificado con exito" });

    } catch (error) {
      next(error)
    }
  };

  getAsistenciasFromSocio = async (req, res, next) => {
    try {
      const { idSocio } = req.params;

      // esto es para acotar las fechas a traer, traeria solo las que se encuentran entre los periodos de tiempo delimitados

      // const { fechaInicio, fechaFin } = req.body;

      // const fechaInicioFormated = formatDate(fechaInicio)
      // const fechaFinFormated = formatDate(fechaFin)

      // if (!fechaInicioFormated || !fechaFinFormated) {
      //   const error = new Error('Formato de fecha invalido')
      //   error.status = 400;
      //   throw error;
      // }

      const result = await Socio.findOne({
        where: { idSocio },
        attributes: ['idSocio', 'nroSocio'],
        include: {
          model: Fecha,
          through: {
            attributes: []
          },
          // where: {
          //   fechaCalendario: {
          //     [Op.between]: [fechaInicioFormated, fechaFinFormated],
          //   },
          // },
        }
      });

      if (!result) {
        const error = new Error(`El Socio con ID ${idSocio} no se encuentra en la DB`)
        error.status = 400;
        throw error;
      }

      res
        .status(200)
        .json({ success: true, message: `Asistencias Del Socio ${idSocio} en el periodo de tiempo seleccionado`, result });

    } catch (error) {
      next(error);
    }

  }

  getSocioPorDni = async (req, res, next) => {
    try {
      const { dni } = req.params;
      console.log("Che, esta llegando aca" + dni);

      const result = await Socio.findOne({
        where: {
          dni,
        },
        attributes: ["idSocio", "nroSocio", "nombre", "apellido", "dni"],
      });
      if (!result) {
        const error = new Error("No existe socio con el dni " + dni + " en la base de datos")
        error.status = 400;
        throw error;
      }

      console.log("Se llego bien.." + result);
      res
        .status(200)
        .json({ success: true, message: "Socio encontrado:", result });

    } catch (error) {
      next(error);
    }

  }
  //En vez de hacerlo tdo en uno lo divido para poder reutilizarlos.
  getSocioPorNroSocio = async (req, res, next) => {
    try {
      const { nroSocio } = req.params;
      console.log("Che, esta llegando aca");
      const result = await Socio.findOne({
        where: {
          nroSocio,
        },
        attributes: ["idSocio", "nroSocio", "nombre", "apellido", "dni"],
      });
      if (!result) {
        const error = new Error("No existe socio con el nroSocio " + nroSocio + " en la base de datos")
        error.status = 400;
        throw error;
      }
      res
        .status(200)
        .json({ success: true, message: "Socio encontrado:", result });

    } catch (error) {
      next(error)
    }

  }

  getSociosPorApellido = async (req, res, next) => {
    try {
      const { apellido } = req.params;
      console.log("Llego a la busqueda por apellido");
      const result = await Socio.findAll({
        where: {
          apellido: {
            [Op.substring]: `%${apellido}%`
          },
        },
        attributes: ["idSocio", "nroSocio", "nombre", "apellido", "dni"],
      });
      if (!result || result.length == 0) {
        const error = new Error("No existen socios con el apellido similar a " + apellido + " en la base de datos")
        error.status = 400;
        throw error;
      }
      res
        .status(200)
        .json({ success: true, message: "Socios encontrados:", result });

    } catch (error) {
      next(error);
    }

  }

  deleteSocioById = async (req, res, next) => {
    try {

      const { idSocio } = req.params;

      const result = await Socio.destroy({
        where: {
          idSocio,
        },
      });

      if (!result) throw new Error("No se pudo eliminar el usuario.");

      res
        .status(200)
        .send({ success: true, message: "Usuario eliminado con exito.",
        });
    } catch (error) {
      next(error)
    }
  };



  async getSocioPorId(idSocio) {
    try {

      const result = await Socio.findOne({
        where: {
          idSocio,
        },
        attributes: ["idSocio", "nombre"],
      });
      if (!result) {
        console.log("No existe el socio con el idSocio" + idSocio);

        return null
      } else {
        console.log("existe el socio con el idSocio" + idSocio);

        return result
      }



    } catch (e) {
      next(e);
    }

  }
}

export default SocioController;
