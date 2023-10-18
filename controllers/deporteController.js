import { Deporte, DeportesXUsuario, Usuario } from "../models/index.js";

class DeporteController {
  constructor() {}

  createDeporte = async (req, res, next) => {
    try {
      const {nombre} = req.body;
      const result = await Deporte.create({
        nombre,
        idCoordinador,
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
        attributes: ["idDeporte", "nombre"],
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

  traerCoordinadoresXDeporte = async (req, res, next) => {
    try {
      const { idDeporte } = req.params;
      const coordinadores = await DeportesXUsuario.findAll({
        where: {
          idDeporte,
        },
      });

      if (coordinadores.length === 0) {
        const error = new Error(
          `No se encontraron coordinadores para el deporte con ID ${idDeporte}`
        );
        error.status = 404;
        throw error;
      }

      const usuarioIds = coordinadores.map(
        (coordinador) => coordinador.idUsuario
      );
      const usuarios = await Usuario.findAll({
        where: {
          idUsuario: usuarioIds,
        },
      });

      res.status(200).send({
        success: true,
        message: "Coordinadores encontrados:",
        coordinadores: usuarios,
      });
    } catch (error) {
      next(error);
    }
  };


  updateDeporte = async (req, res, next) => {
    try {
      const { idDeporte } = req.params;
      const { nombre } = req.body;
      const result = await Deporte.update(
        {
          nombre,
        },
        {
          where: {
            idDeporte: idDeporte,
          },
        }
      );
      if (!result) throw new Error("El deporte no pudo ser modificado");
      res
        .status(200)
        .send({ success: true, message: "Deporte modificado con exito" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  async updateCoordinador(req, res, next) {
    try {
      const { idDeporte } = req.params;
      const { idUsuario } = req.body;

      // Primero, intenta buscar un registro existente
      const [coordinador, created] = await DeportesXUsuario.findOrCreate({
        where: {
          idDeporte: idDeporte,
          idUsuario: idUsuario,
        },
      });

      if (!created) {
        // El registro ya existía, por lo que simplemente actualizamos el idUsuario
        coordinador.idUsuario = idUsuario;
      }

      res
        .status(200)
        .send({ success: true, message: "Coordinador modificado con éxito" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  }

  async deleteCoordinadoresXDeporte(req, res, next) {
    try {
      const { idDeporte } = req.params;
      const result = await DeportesXUsuario.destroy({
        where: {
          idDeporte: idDeporte,
        },
      })
      res
        .status(200)
        .send({ success: true, message: "Coordinadores desasignados con éxito" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  }

  async traerIdCoordinadorTablaIntermedia(req, res, next){
    try {
      const { idDeporte } = req.params;
      const result = await DeportesXUsuario.findOne({
        where: {
          idDeporte: idDeporte,
        },
      })
      if (!result) {
        const error = new Error(
          `el deporte con ID ${idDeporte} no se encuntra en la base de datos`
        );
        error.status = 400;
        throw error;
      }
      res
        .status(200)
        .send({ success: true, result: result, message: "Coordinador obtenido con éxito" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  }

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
