import infoContacto from "../models/infoContacto";

class InfoContactoController {
    constructor() {}
    crearContacto = async(req,res,next) => {
        try {
            const {idSocio,nombre,apellido,mail,telefono} = req.body;
            const result = await infoContacto.create( {
                idSocio,nombre,apellido,mail,telefono,
            });
            if (!result) throw new Error("El usuario no pudo ser creado");
            res
                 .status(200)
                 .send({ success: true, message: "Ususario creado con exito" });
        }catch(error){
            res.status(400).send({ success: false, message: error.message });
    }
    }
    
}

export default InfoContactoController;


