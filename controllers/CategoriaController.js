import CategoriasXUsuario from "../models/CategoriasXUsuario.js";
import { Categoria, Deporte, Socio, Fecha } from "../models/index.js"
import DeporteController from "./deporteController.js";
import UsuarioController from "./Usuario.controller.js";
class CategoriaController {
  constructor() { }

  createCategoria = async (req, res, next) => {
    try {
      const { nombreCategoria, idDeporte, idUsuarios /*, idUsuario */ } = req.body;
      const result = await Categoria.create({
        nombreCategoria,
        idDeporte,
        /* idUsuario,*/
      });
      if (!result) {
        throw new Error("La categoria no pudo ser creada");
      }

      const profesAgregados = await this.agregarProfesCategoriaNueva(idUsuarios, result.idCategoria)


      if (profesAgregados) {
        res
          .status(200)
          .send({ success: true, message: "Categoria creada con exito" });
      } else {
        res
          .status(200)
          .send({ success: true, message: "Categoria creada con exito. No se agrgaron los profesores. No se ingresaron profesores, no existen o ingresaste usuarios con un rol distinto a profesor" });
      }


    } catch (error) {
      next(error)
    }
  };

  getAllCategorias = async (req, res, next) => {
    try {
      const result = await Categoria.findAll({
        attributes: [
          "idCategoria",
          "nombreCategoria",
          "idDeporte",
        ],
      });

      if (result.length == 0) {
        const error = new Error(
          "No hay categorias cargadas en la base de datos"
        );
        error.status = 400;
        throw error;
      }
      //estaba "result cambio a res"
      res
        .status(200)
        .json({ succes: true, message: "Categorias encontradas:", result });
    } catch (error) {
      next(error)
    }
  };

  getCategoriaById = async (req, res, next) => {
    try {
      const { idCategoria } = req.params;

      const result = await Categoria.findOne({
        where: {
          idCategoria,
        },
        attributes: [
          "idCategoria",
          "nombreCategoria",
          "idDeporte",
        ],
        include: {
          model: Deporte,
          attributes: ['nombre'],
        }
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

  getNombreCategoria = async (req, res, next) => {
    try {
      const {
        idCategoria
      } = req.params;

      const result = await Categoria.findOne({
        attributes: ["nombreCategoria"],
        where: {
          idCategoria
        },
      });

      if (!result) throw new Error("Error en la busqueda de categoria");
      res
        .status(200)
        .json({ nombreCategoria: result.nombreCategoria });
    } catch (error) {
      next(error)
    }

  }

  getNombreDeporte = async (req, res, next) => {
    try {
      const { idCategoria } = req.params;
      console.log("El id categoria que llega es el: " + idCategoria);
      const result = await Categoria.findOne({
        attributes: ["idDeporte"],
        where: {
          idCategoria
        },
      });
      console.log("Termino la consulta");
      if (!result) {
        console.log("No encontró ningun idDeporte");

        throw new Error("Error en la búsqueda del idDeporte de la categoría");
      }
      let deporte1 = new DeporteController();
      const nombreDeporte = await deporte1.getNombreDeporteById(result.dataValues.idDeporte)
      res.status(200).json({ nombreDeporte: nombreDeporte });
    } catch (error) {
      next(error)
    }
  }

  getCategoriasByIdDeporte = async (req, res, next) => {
    try {
      const { idDeporte } = req.params;

      const result = await Categoria.findAll({
        attributes: [
          "idCategoria",
          "nombreCategoria",
          /* "idUsuario",*/
        ],
        where: {
          idDeporte: idDeporte,
        },
      });

      if (result.length === 0) {
        const error = new Error(
          "No hay categorías con el idDeporte:" + idDeporte
        );
        error.status = 400;
        throw error;
      }

      res
        .status(200)
        .send({ success: true, message: "Categorías encontradas:", result });
    } catch (error) {
      next(error);
    }
  };

  getSociosOfCategoriaWithAsistencia = async (req, res, next) => {
    try {
      const { idCategoria } = req.params;

      let message = "Socios de la categoria:"

      const result = await Categoria.findOne({
        attributes: [],
        where: {
          idCategoria,
        },
        include: [
          {
            model: Socio,
            attributes: ['idSocio', 'nroSocio', 'nombre', 'apellido', 'dni', 'email', 'fechaNacimiento'],
            through: {
              attributes: []
            },
            include: {
              model: Fecha,
              required: false,
              attributes: ['idFecha', 'fechaCalendario', 'tipo'],
              through: {
                attributes: ['estado']
              },
              where: {
                idCategoria,
              },
            }
          },
        ]
      });

      if (!result) {
        const error = new Error(`La categoria con ID ${idCategoria} no se encuentra en la base de datos`);
        error.status = 400;
        throw error;
      }

      if (result.Socios.length == 0) {
        const error = new Error(`La categoria con ID ${idCategoria} no tiene socios`);
        error.status = 400;
        throw error;
      }

      res
        .status(200)
        .send({ success: true, message, result: result.Socios });

    } catch (error) {
      next(error);
    }
  }

  getFechasOfCategoria = async (req, res, next) => {
    try {
      const { idCategoria } = req.params;

      const result = await Categoria.findOne({
        where: { idCategoria },
        attributes: ['nombreCategoria'],
        include: [
          {
            model: Fecha,
            as: "Fechas",
            attributes: ['idFecha', 'idCategoria', 'fechaCalendario', 'tipo'],

          },
        ],
      });

      if (!result) {
        const error = new Error(`La categoria con ID ${idCategoria} no se encuentra en la base de datos`);
        error.status = 400;
        throw error;
      }


      if (result.Fechas.length == 0) throw new Error("No hay fechas en la base de datos para esta categoría");

      res
        .status(200)
        .send({ success: true, message: 'Fechas encontradas:', result });

    } catch (error) {
      next(error);
    }
  };

  getAllProfesoresCategoria = async (req, res, next) => {
    const { idCategoria } = req.params;
    try {

      if (!await this.existeCategoria(idCategoria)) {
        throw new Error("No existe la categoria buscada")
      }

      const result = await CategoriasXUsuario.findAll({
        where: {
          idCategoria
        },
        attributes: [
          "idUsuario",
        ],
      });

      if (result.length == 0) {
        const error = new Error(
          "No hay profesores asignados en la categoria"
        );
        error.status = 400;
        throw error;
      }
      let usuarioController = new UsuarioController();

      let usuariosList = [];

      for (const profesor of result) {
        usuariosList.push(await usuarioController.getUsuarioPorId(profesor.idUsuario))
      }

      //estaba "result cambio a res"

      res
        .status(200)
        .json({ succes: true, message: "Profesores encontradas:", usuariosList });

    } catch (error) {
      next(error)
    }
  };

  updateCategoria = async (req, res, next) => {
    try {
      const { idCategoria } = req.params;
      const { nombreCategoria, idDeporte /*, idUsuario */ } = req.body;

      const result = await Categoria.update(
        {
          idCategoria,
          nombreCategoria,
          idDeporte,
          /* idUsuario,*/
        },
        {
          where: {
            idCategoria: idCategoria,
          },
        }
      );

      if (!result) throw new Error("La categoria no pudo ser modificada");

      res
        .status(200)
        .send({ success: true, message: "Categoria modificada con exito" });
    } catch (error) {
      next(error)
    }
  };

  agregarProfesACategoriaExistente = async (req, res, next) => {

    const { idCategoria } = req.params;
    const { idUsuarios } = req.body;

    console.log(idUsuarios);

    try {
      let prueba = await this.agregarProfesCategoriaNueva(idUsuarios, idCategoria)
      console.log("se agregaron: " + prueba);
      if (!prueba) {
        throw new Error("No se pasaron profesores o ninguno es de tipo profesor");
      }

      res
        .status(200)
        .send({ success: true, message: "Profesores agregados con éxito" });

    } catch (error) {
      next(error)
    }
  }

  eliminarProfesoresCategoria = async (req, res, next) => {
    const { idCategoria } = req.params;
    try {

      const result = await CategoriasXUsuario.destroy({
        where: {
          idCategoria
        },
      });

      res
        .status(200)
        .send({ success: true, message: "Profesores borrados con éxito" });

    } catch (error) {
      next(error)
    }
  }

  eliminarCategoria = async (req, res, next) => {
    const { idCategoria } = req.params;
    try {

      let result = await Categoria.destroy({
        where: {
          idCategoria
        },
      });
      if (!result) {

        throw new Error("No existe la categoria seleccionada")
      }

      res
        .status(200)
        .send({ success: true, message: "Categoria eliminada con éxito" });

    } catch (error) {
      next(error)
    }
  }

  async existeCategoria(idCategoria) {
    let existe = false
    try {
      const result = await Categoria.findOne({
        where: {
          idCategoria: idCategoria,
        },
      })
      if (result) {
        existe = true
      }

      return existe
    } catch (e) {
      throw new Error("Error validando la categoria")
    }
  }

  async agregarProfesCategoriaNueva(idProfesores, idCategoria) {

    // igna: valida que idProfesores sea un array
    if (!Array.isArray(idProfesores)) throw new Error("Los IDs de Usuarios estan en un formato Incorrecto");

    let agregados = false;

    const usuarioController = new UsuarioController();

    let profesExistentes = []
    for (const profe of idProfesores) {
      if (await usuarioController.existeProfesorPorId(profe) && await usuarioController.validarTipo(profe, 'P')) {
        profesExistentes.push(profe);
      }
    }

    if (profesExistentes.length > 0) {

      const idProfes = profesExistentes.map(profe => ({
        idUsuario: profe,
        idCategoria: idCategoria
      }));

      try {
        const result = await CategoriasXUsuario.bulkCreate(
          idProfes
        )
        if (!result) throw new Error("Error con alguna de la inserciones");

        agregados = true

      } catch (e) {
        throw (e)
      }
    }

    return agregados
  }

  getIdDeporteByIdCategoria = async(idCategoria) => {

    let result = await Categoria.findOne({
      where:{
        idCategoria:idCategoria
      },attributes:["idDeporte"]
    })

    if(!result){
      throw new Error("No existe la categoria indicada")
    }

    return result.idDeporte

  }
}
export default CategoriaController;
