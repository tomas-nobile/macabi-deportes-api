import { Deporte, DeportesXUsuario, Usuario } from "../models/index.js";

class DeporteController {
  constructor() { }

  createDeporte = async (req, res, next) => {
    try {

      const { nombre } = req.body;
      const result = await Deporte.create({
        nombre,
      });

      if (!result) throw new Error("El Deporte no pudo ser creado");

      res
        .status(200)
        .send({ success: true, message: "Deporte creado con exito" });

    } catch (error) {

      next(error);

    }
  };

  getDeporteById = async (req, res, next) => {
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

  getAllDeportes = async (req, res, next) => {
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

  getCoordinadoresXDeporte = async (req, res, next) => {
    try {

      const { idDeporte } = req.params;

      const deporte = await Deporte.findOne({
        where: {
          idDeporte,
        },
        attributes:['nombre'],
        include: {
          model:Usuario,
          as:'CoordinadoresAsignados',
          attributes:['idUsuario','nombre','apellido','dni','email','idRol'],
          through: {
            attributes: []
          }
        }
      });

      if (!deporte) {
        const error = new Error(
          `El deporte con ID ${idDeporte} no se encuntra en la base de datos`
        );
        error.status = 404;
        throw error;
      }

      res.status(200).send({
        success: true,
        message: `Coordinadores encontrados`,
        coordinadores: deporte,
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

  updateCoordinador = async(req, res, next) => {
    try {
      const { idDeporte } = req.params;
      const { idUsuario } = req.body;

      let message = "Coordinador Agregado con éxito"

      const usuario = await Usuario.findOne({
        where: {
          idUsuario,
        },
        attributes: ['idUsuario','idRol']
      });

      if (!usuario) {
        const error = new Error(
          `El usuario con ID ${idUsuario} no se encuentra en la base de datos`
        );
        error.status = 400;
        throw error;
      }

      if (usuario.dataValues.idRol != 2) {
        console.log("sadd");
        const error = new Error(
          `El usuario con ID ${idUsuario} no es un Coordinador`
        );
        error.status = 400;
        throw error;
      }

      const deporte = await Deporte.findOne({
        where: {
          idDeporte,
        }
      });

      if (!deporte) {
        const error = new Error(
          `El deporte con ID ${idDeporte} no se encuentra en la base de datos`
        );
        error.status = 400;
        throw error;
      }


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
        message = "Coordinador Modificado con éxito"
      }

      res
        .status(200)
        .send({ success: true, message });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  }

  deleteCoordinadoresXDeporte = async(req, res, next) => {
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

  traerIdCoordinadorTablaIntermedia = async(req, res, next) => {
    try {
      const { idDeporte } = req.params;
      const result = await DeportesXUsuario.findAll({
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


}

export default DeporteController;
