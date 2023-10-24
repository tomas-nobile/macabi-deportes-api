import { Categoria, SociosXCategorias } from "../models/index.js";
import Socio from "../models/Socio.js";

class SociosXCategoriasController {
  constructor() {}

  getSociosByIdCategoria = async (idCategoria) => {
    try {
      const result = await SociosXCategorias.findAll({
        attributes: ["idSocio"],
        where: { idCategoria: idCategoria },
      });
      //   if (!result) throw new Error("Error en la obtencion de los socios x Id");
      return result;
    } catch (e) {
      e;
    }
  };

  getDatosSociosCategoria = async (req, res, next) => {
    try {
      const { idCategoria } = req.params;
      console.log("Antes de la consulta");
      const idSociosDatos = await SociosXCategorias.findAll({
        where: { idCategoria: idCategoria },
        attributes: ["idSocio"],
      });
      console.log("Llega aca");

      try {
        const sociosDatos = await Socio.findAll({
          where: {
            idSocio: idSociosDatos.map((idSocio) => idSocio.idSocio),
          },
        });

        console.log(sociosDatos);
        if (!sociosDatos) {
          return res
            .status(404)
            .json({ error: "Socios de la categoría no encontrados" });
        }
        res.status(200).json({ sociosDatos });
      } catch (e) {
        throw "Error con sociosDatos";
      }
    } catch (e) {
      res.status(500).json({
        error: "Hubo un error al obtener los datos de socios por categoría.",
      });
    }
  };

  getCategoriasByIdSocio = async (req, res, next) => {
    try {
      const { idSocio } = req.params;
      const idsCategorias = await SociosXCategorias.findAll({
        where: { idSocio: idSocio },
        attributes: ["idCategoria"],
      });
      try {
        const categorias = await Categoria.findAll({
          where: {
            idCategoria: idsCategorias.map(
              (Categoria) => Categoria.idCategoria
            ),
          },
        });

        if (!categorias) {
          return res
            .status(404)
            .json({ error: "Categorias por socio no encontrado" });
        }
        res.status(200).json({ categorias });
      } catch (error) {
        console.error("Error en la obtención de categorías:", error);
        res.status(500).json({
          error: "Hubo un error al obtener los datos de categorías por socios.",
        });
      }
    } catch (error) {
      console.error("Error en la obtención de IDs de categorías:", error);
      res.status(500).json({
        error: "Hubo un error al obtener los IDs de categorías por socios.",
      });
    }
  };
}

export default SociosXCategoriasController;
