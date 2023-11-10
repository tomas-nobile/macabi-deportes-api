import { Fecha, Categoria } from "../models/index.js";
import AsistenciaController from "./Asistencia.controller.js";
import SociosXCategoriasController from "./SociosXCategoriasController.js";
class FechaController {

  constructor() { }

  createFecha = async (req, res, next) => {
    try {
      const {
        idCategoria,
        fechaCalendario,
        tipo,
        idSocios
      } = req.body;

      if (await this.existeFecha(idCategoria, fechaCalendario)) {
        throw new Error("La fecha no puede ser creada porque ya existe esta fecha en esta categoria");
      }

      const result = await Fecha.create({
        idCategoria,
        fechaCalendario,
        tipo
      });

      if (!result) throw new Error("La fecha no puede ser creada");

      const asistenciaController = new AsistenciaController()

      if (result) {

        if (tipo === "E") {
          const sociosXCategoriasController = new SociosXCategoriasController();
          try {
            const socios = await sociosXCategoriasController.getSociosByIdCategoria(idCategoria);
            if (socios) {
              socios.forEach(socio => {
                asistenciaController.crearAsistenciaAuxiliar(result.dataValues.idFecha, socio.dataValues.idSocio, null)
              });
            }
          } catch (e) {
            console.log("Hubo un error:", error);
          }

        } else {
          try {
            idSocios.forEach(socio => {
              asistenciaController.crearAsistenciaAuxiliar(result.dataValues.idFecha, socio.idSocio, null)
            });
          } catch (e) {
            console.log("Hubo un error con las citaciones:", error);
          }

        }

      }
      res
        .status(200)
        .send({ success: true, message: "Fecha creada con exito" });
    } catch (error) {
      next(error);
    }
  };

  getAllFechas = async (req, res, next) => {
    try {
      const result = await Fecha.findAll({
        attributes: ['idFecha', 'idCategoria', 'fechaCalendario', 'tipo'],
        include: [
          {
            model: Categoria,
            attributes: ['nombreCategoria'],
          },
        ],
      });

      if (result.length == 0) {
        const error = new Error('No hay fechas en la base de datos');
        error.status = 400;
        throw error;
      }

      res.status(200).send({ success: true, message: 'Fechas encontradas:', result });
    } catch (error) {
      next(error)
    }
  };

  getDatosFecha = async (req, res, next) => {
    try {

      const { idFecha } = req.params;

      const fecha = await Fecha.findOne({
        where: { idFecha },
        attributes: ['idCategoria', 'fechaCalendario', 'tipo'],
      });

      if (!fecha) throw new Error('Fecha no encontrada');

      const idCategoria = fecha.idCategoria;

      const result = await Fecha.findAll({
        where: { idCategoria, fechaCalendario: fecha.fechaCalendario, tipo: fecha.tipo },
        attributes: ['idFecha', 'idCategoria', 'fechaCalendario', 'tipo'],
        include: [
          {
            model: Categoria,
            attributes: ['nombreCategoria'],
          },
        ],
      });

      res
        .status(200)
        .send({ success: true, message: 'Datos de la fecha encontrados:', result });

    } catch (error) {
      next(error)
    }
  };

  getFechasDeCategoria = async (req, res, next) => {
    const { idCategoria } = req.params;
    try {
      const result = await Fecha.findAll({
        where: { idCategoria }, // Filtra por idCategoria
        attributes: ['idFecha', 'idCategoria', 'fechaCalendario', 'tipo'],
        include: [
          {
            model: Categoria,
            attributes: ['nombreCategoria'],
          },
        ],
      });

      if (result.length == 0) {
        res.status(200).send({ success: true, message: `No hay fechas en la base de datos para esta categoría`, result: [] });
      } else {
        res.status(200).send({ success: true, message: 'Fechas encontradas:', result });
      }
    } catch (error) {
      next(error)
    }
  };

  patchFechaById = async (req, res, next) => {
    try {
      const { idFecha } = req.params;
      const {
        fechaCalendario,
        idCategoria
      } = req.body;

      await this.existeFechaModificar(idCategoria, fechaCalendario, idFecha)
      const result = await Fecha.update(
        {
          fechaCalendario
        },
        {
          where: {
            idFecha
          },
        }
      );

      if (!result) throw "Fallo al editar la fecha"
      res
        .status(200)
        .send({ success: true, message: "Fecha modificada con exito" });
    } catch (error) {
      next(error)
    }
  };

  eliminarFecha = async (req, res, next) => {
    const { idFecha } = req.params;

    try {

      let result = await Fecha.destroy({
        where: {
          idFecha
        },
      });

      if (!result) {
        throw new Error("No existe fecha seleccionada")
      }

      res
        .status(200)
        .send({ success: true, message: "Fecha eliminada con éxito" });

    } catch (error) {
      next(error)
    }
  }

  existeFecha = async (idCategoria, fechaCalendario) => {
    let existe = false
    try {

      const result = await Fecha.findOne({
        attributes: ['idCategoria', 'fechaCalendario'], where: { idCategoria: idCategoria, fechaCalendario: fechaCalendario },
      })

      if (result) {
        existe = true
      } else {

      }

      return existe
    } catch (e) {
      console.log(e);
    }

  }

  existeFechaModificar = async (idCategoria, fechaCalendario, idFecha) => {
    const result = await Fecha.findOne({
      attributes: ['fechaCalendario', 'idFecha'], where: { idCategoria: idCategoria, fechaCalendario: fechaCalendario },
    })


    if (result && result.dataValues.idFecha != idFecha) throw "La fecha seleccionada ya esta siendo utilizada"

  }

}

export default FechaController