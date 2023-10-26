import { Categoria, SociosXCategorias } from "../models/index.js";
import Socio from "../models/Socio.js";
import SocioController from "./Socio.Controller.js";

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
 
    agregarSociosACategorias = async (req,res,next) => {
        try {
            const {idCategoria} = req.params;
            const {nuevosSocios} = req.body;

            console.log(nuevosSocios);

            const socios = nuevosSocios.map(socio => ({
                idSocio: socio,
                idCategoria: idCategoria
              }));
            console.log(socios);
            
            const result = await SociosXCategorias.bulkCreate(
                socios
            , { validate: true })

            if (!result) throw new Error("Error con alguna de la inserciones");

            res
            .status(200)
            .send({ success: true, message: "Socios agregados con éxito" });

        }catch(e){
            console.log(e);
            next(e)
        }
        


    }

    agregarSociosACategoriasB = async (req,res,next) => {
        try {
           const  {socios} = req.body //Aca se recibe [{idSocio:..;nroSocio:..}]
           const {idCategoria} = req.params
           console.log("El param que llega:" + idCategoria);
           console.log(socios);
            const nuevosSocios = [];
            const sociosExistentes = [];
            const SociosInexistentes = [];


            for (const socio of socios) {
                let socioController = new SocioController();
                if(await socioController.getSocioPorId(socio.idSocio) != null) {

                    if(await this.existeSocioEnCategoria(socio.idSocio,idCategoria)) {
                        sociosExistentes.push(socio.idSocio)
                    }else {
                        nuevosSocios.push({idSocio:socio.idSocio, idCategoria:idCategoria})

                    }


                }else {
                    SociosInexistentes.push(socio.idSocio)
                }
            }

            if(nuevosSocios.length > 0){
                try {
                    const result = await SociosXCategorias.bulkCreate(
                        nuevosSocios
                    , { validate: true })

                    if (!result) throw new Error("Error con alguna de la inserciones");

                    

                    res
                    .status(200)
                    .send({ success: true, message: "Se agregaron socios a la BD", idSociosYaExistentes:sociosExistentes, idSociosInexistentes:SociosInexistentes });


                    

                }catch(e){
                    console.error("Error en la inserción:", e);
                }
            }else {
                res.status(400).send({
                    success: false,
                    message: "No hay nuevos socios para asignar a la categoria"
                });
            }


        }catch(e){
            console.log(e);
            next(e)
        }
    }

    async existeSocioEnCategoria (idSocio,idCategoria){
       
        try {
            
            let existe = false
            const result = await SociosXCategorias.findOne({
                 where: {
                    idSocio:idSocio,idCategoria:idCategoria
                 },
            })
            if(result){
                existe = true
            }

            console.log("Existe el socio " + idSocio + " : " + existe) ;

            return existe
        }catch(e){
            throw new Error('Error al verificar la existencia del socio en la categoría'); }
    }

    async existeAlMenos1Socio(idCategoria){
        try {
            
            let existe = false
            const result = await SociosXCategorias.findOne({
                 where: {
                    idCategoria:idCategoria
                 },
            })
            if(result){
                existe = true
            }
            return existe
    }catch(e){
        throw new Error('Error al verificar la existencia de socios en la categoria'); 
    }
}





    //Puedo hacerlo de varias formas:
    /*
Un bullCreat pero no me voy a enterar xq tuvo error en alguno de los socios
    */

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
