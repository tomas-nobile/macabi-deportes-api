import { SociosXCategorias } from "../models/index.js"
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


}


export default SociosXCategoriasController;