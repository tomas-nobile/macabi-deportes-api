import { Fecha } from "../models/index.js";
import AsistenciaController from "./Asistencia.controller.js";
import CategoriaController from "./CategoriaController.js";
import SociosXCategoriasController from "./SociosXCategoriasController.js";
class FechaController {

    constructor() { }

    createFecha = async (req, res, next) => {
        const {idCategoria, fechaCalendario ,tipo, idSocios} = req.body;
        console.log("La fecha es : " + fechaCalendario + " el id categoria: " + idCategoria + " y el tipo: " + tipo);


        try {
          await  this.valiadorDeParametrosCreate(idCategoria,fechaCalendario,tipo,idSocios);
          console.log("id Socios:...idSocios");
            const result = await Fecha.create({ idCategoria, fechaCalendario , tipo });

            if (!result) throw new Error("La fecha no puede ser creada");
            const asistenciaController = new AsistenciaController()

            if(result){

                if(tipo === "E") {
                    const sociosXCategoriasController = new SociosXCategoriasController();
                    try {
                        const socios = await sociosXCategoriasController.getSociosByIdCategoria(idCategoria);
                        if (socios) {
                            socios.forEach(socio => {
                                asistenciaController.crearAsistenciaAuxiliar(result.dataValues.idFecha,socio.dataValues.idSocio,null)
                            });
                        }
                    }catch(e){
                        console.log("Hubo un error:", error);
                    }


                }else {
                    try {
                        idSocios.forEach(socio => {
                           
                                asistenciaController.crearAsistenciaAuxiliar(result.dataValues.idFecha,socio.idSocio,null)
                            
                        });
                    }catch(e){
                        console.log("Hubo un error con las citaciones:", error);
     
                    }

                }


            }                    
            res
                .status(200)
                .send({ success: true, message: "Fecha creada con exito" });
        } catch (error) {
            res.status(400).send({ success: false, message: error.message}); //Le pongo este dato para q se valide
        }
    };

    existeFecha = async (idCategoria, fechaCalendario) => {
       let existe = false
        try {

            const result = await Fecha.findOne({
                attributes: ['idCategoria', 'fechaCalendario'],where: {idCategoria: idCategoria, fechaCalendario: fechaCalendario},
            })

            if(result) {
                existe = true
            }else {

            }

            return existe
    }catch(e){
        console.log(e);
    }

 }

 async valiadorDeParametrosCreate(idCategoria, fechaCalendario ,tipo, idSocios){

    if(idCategoria == null || fechaCalendario == null || tipo == null ){
        throw new Error("No se puede crear una fecha sin todos los datos necesarios (Categoria, fecha y tipo)");
    }else {
        if(tipo == "C") {
            if(idSocios == null) {
                throw new Error("Error. No se respeta el formato de envio de socios"); //Chequear estas validaciones
            }
            console.log("Llegue a validar aca");
            if(idSocios.length == 0 ) {
                console.log("Es 0");
                console.log(idSocios.length);
                throw new Error("Error. No se ingresaron socios para cargar");
        
            }else {
                console.log("Es más de 0");
                console.log(idSocios.length);
                this.validarIdSocioCompleto(idSocios)
            }
        }
        
    }
    
    let categoriaController = new CategoriaController();
    if(!await categoriaController.existeCategoria(idCategoria)) {
        throw new Error("No existe la categoria");
    }
    
    if(await this.existeFecha(idCategoria,fechaCalendario))  {
    throw new Error("La fecha no puede ser creada porque ya existe esta fecha en esta categoria.");
    }
 

    //No valido el tipo. ya q te da error auotmatico (Si le da la fecha mal aunque te da mal el tipo , primero te corrige eso, pero no se rompe.)
    

 }

  validarIdSocioCompleto(sociosList){
    for (const socio of sociosList) {
        if(!socio.idSocio){
            throw new Error("Error en el formato que se enviaron los socios")
        }
    }
  }

 

}

export default FechaController