import Rol from "../models/rol";

class RolController {
    constructor() {} 

    crearRol = async(req,res,next) => {
        try {
            const {Id,tipo} = req.body;
            const result = await Rol.create({
                Id,tipo
            });
            if (!result) throw new Error("El rol no pudo ser creado");
            res
            .status(200)
            .send({ success: true, message: "Rol creado con exito" });

        }catch(error){
            res.status(400).send({ success: false, message: error.message });
    }
}
}

export default SocioController;