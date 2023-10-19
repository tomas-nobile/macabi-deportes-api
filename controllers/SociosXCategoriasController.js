import { SociosXCategorias } from "../models/index.js"
import Socio from "../models/Socio.js";

class SociosXCategoriasController {
        constructor() {}
        

    getSociosByIdCategoria = async (idCategoria) =>  {
        try {
            const result = await SociosXCategorias.findAll({
                attributes: ['idSocio'],where: {idCategoria: idCategoria}
            })
         //   if (!result) throw new Error("Error en la obtencion de los socios x Id");
            return result
        }catch(e){
            e
        }
    }

    getDatosSociosCategoria = async(req,res,next) => {
        try{
            const {idCategoria} = req.params;
            console.log("Antes de la consulta");
            const idSociosDatos = await SociosXCategorias.findAll({
                where: {idCategoria: idCategoria},
                attributes:['idSocio']   
     
            })
            console.log("Llega aca");

            try {
                const sociosDatos = await Socio.findAll({
                    where: {
                      idSocio: idSociosDatos.map((idSocio) => idSocio.idSocio),
                    },
                  });

                

                  console.log(sociosDatos);
                  if (!sociosDatos) {
                    return res.status(404).json({ error: "Socios de la categoría no encontrados" });
                }
                res.status(200).json({ sociosDatos });
                  
            }catch(e){
                throw "Error con sociosDatos"
            }

            


            
            


        }catch(e){
            res.status(500).json({ error: "Hubo un error al obtener los datos de socios por categoría." });

        }
    }
 
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


    //Puedo hacerlo de varias formas:
    /*
Un bullCreat pero no me voy a enterar xq tuvo error en alguno de los socios
    */


}


export default SociosXCategoriasController;