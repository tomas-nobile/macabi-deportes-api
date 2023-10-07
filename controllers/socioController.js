import Socio from "../models/socio";

class SocioController {
    constructor() {} 

    crearSocio = async(req,res,next) => {
        try {
            const {id,dni,nombre,apellido,fechaDeNacimiento,email,clave,telefono,direccion,observaciones} = req.body;
            const result = await Socio.create({
                id,dni,nombre,apellido,fechaDeNacimiento,email,clave,telefono,direccion,observaciones  
            });
            if (!result) throw new Error("El socio no pudo ser creado");
            res
            .status(200)
            .send({ success: true, message: "Socio creado con exito" });
        }catch(error){
            res.status(400).send({ success: false, message: error.message });
    }
}
}

export default SocioController;