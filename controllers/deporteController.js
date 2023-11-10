import { Deporte, DeportesXUsuario, Usuario } from "../models/index.js";
import UsuarioController from "./Usuario.controller.js";

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
          attributes:['idUsuario','nombre','apellido','dni','email','activo','idRol'],
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
        result: deporte,
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

  agregarCoordinadoresADeporteExistente = async (req, res, next) => {
    
    const {idUsuarios} = req.body;
    const {idDeporte} = req.params;

    console.log(idUsuarios);

    try {
      let prueba = await this.agregarCoordinadoresDeporteNuevo(idUsuarios,idDeporte)
      console.log("se agregaron: " + prueba);
     if(!prueba) {
      throw new Error ("No se pasaron coordinadores o ninguno es de tipo coordinadore");
     }

            res
            .status(200)
            .send({ success: true, message: "Coordinadores agregados con éxito" });

    }catch(e){

      next(e)

    }



  }

  async agregarCoordinadoresDeporteNuevo(idCoordinadores,idDeporte){
    let agregados = false;
    const usuarioController = new UsuarioController();

    let coordinadoresExistentes = [] 
    for (const coordinador of idCoordinadores) {
      if (await usuarioController.existeProfesorPorId(coordinador) && await usuarioController.validarTipo(coordinador, 'C')) {
        coordinadoresExistentes.push(coordinador);
      }
    }

    console.log("Coordinadores existentes y tipo C: " + coordinadoresExistentes.length[0]);

    if(coordinadoresExistentes.length > 0){
console.log("Entre al if");
      const idsCoordinador = coordinadoresExistentes.map(profe => ({
        idUsuario: profe,
        idDeporte: idDeporte
      }));
  

      try {
        const result = await DeportesXUsuario.bulkCreate(
          idsCoordinador
        )
        if (!result) throw new Error("Error con alguna de la inserciones");
  
        agregados = true

      
      }catch(e){
        throw (e)
  
      }

    }

      return agregados 
    
  }

  eliminarDeporte = async (req, res,next) => {
    const {idDeporte} = req.params;
    try {

      let result =  await Deporte.destroy({
        where: {
          idDeporte
        },
      });

      if(!result){
        throw new Error("No existe deporte seleccionado")
      }

      res
              .status(200)
              .send({ success: true, message: "Deporte eliminado con éxito" });

    }catch(e){
      next(e)
    }
  }
}

export default DeporteController;
