import {Categoria} from "../models/index.js"
import DeporteController from "./deporteController.js";
class CategoriaController{
    constructor() {}

  createCategoria = async (req, res, next) => {
    try {
      const { nombreCategoria, idDeporte, idUsuario } = req.body;
      const result = await Categoria.create({
        nombreCategoria,
        idDeporte,
        idUsuario,
      });
      if (!result) throw new Error("La categoria no pudo ser creada");
      res
        .status(200)
        .send({ success: true, message: "Categoria creada con exito" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  traerCategoriaPorId = async (req, res, next) => {
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
          "idUsuario",
        ],
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

  traerTodasLasCategorias = async (req, res, next) => {
    try {
      const result = await Categoria.findAll({
        attributes: [
          "idCategoria",
          "nombreCategoria",
          "idDeporte",
          "idUsuario",
        ],
      });

      if (result.length == 0) {
        const error = new Error(
          "no hay categorias con el idDeporte:" + idDeporte
        );
        error.status = 400;
        throw error;
      }
      //estaba "result cambio a res"
      res
            .status(200)
            .json({ succes: true, message: "Categorias encontradas:" , result});
          }catch(e){
          result.status(400).send({ success: false, message: e.message });
  }
};
      getNombreCategoria = async (req, res, next) => {
        try {
          const {
            idCategoria
          } = req.params;
          const result = await Categoria.findOne({
            attributes:["nombreCategoria"],
            where:{
              idCategoria
            },
          });
          if (!result) throw new Error("Error en la busqueda de categoria");
          res
            .status(200)
            .json({ nombreCategoria: result.nombreCategoria });
          }catch(e){
        res.status(400).send({ success: false, message: e.message });
    
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
        res.status(200).json({ nombreDeporte: nombreDeporte});
      } catch (e) {
        console.error("Error en getNombreDeporte:", e);
        res.status(400).json({ success: false, message: e.message });
      }
    }

    
    
    
    
          

  traerTodasLasCategoriasXIdDeporte = async (req, res, next) => {
    try {
      const { idDeporte } = req.params;
      const result = await Categoria.findAll({
        attributes: [
          "idCategoria",
          "nombreCategoria",
          "idDeporte",
          "idUsuario",
        ],
        where: {
          idDeporte: idDeporte,
        },
      });

      if (result.length === 0) {
        const error = new Error("No hay categorías con el idDeporte:" + idDeporte);
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

  updateCategoria = async (req, res, next) => {
    try {
      const { idCategoria } = req.params;
      const { nombreCategoria, idDeporte, idUsuario } = req.body;
      const result = await Categoria.update(
        {
          nombreCategoria,
          idDeporte,
          idUsuario,
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
      res.status(400).send({ success: false, message: error.message });
    }
  };

  async existeCategoria(idCategoria){
    let existe = false
    try {
      const result = await Categoria.findOne({
        where: {
          idCategoria: idCategoria,
        },
      })
      if(result){
        existe = true
      }

      return existe
    }catch(e){
      throw new Error("Error validando la categoria")
    }
  }



}
export default CategoriaController;
