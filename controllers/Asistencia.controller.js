import { Asistencia } from "../models/index.js";

class AsistenciaController {

    constructor() { }

    createAsistencia = async (req, res, next) => {
        try {

            const { idFecha ,idSocio, estado} = req.body;

            const result = await Asistencia.create({idFecha ,idSocio, estado});
            if (!result) throw new Error("La asistencia no puede ser creada");
            res
                .status(200)
                .send({ success: true, message: "Asistencia creada con exito" });
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    };

    

    crearAsistenciaAuxiliar = async (idFecha,idSocio,estado) => {
        try {

            const result = await Asistencia.create({idFecha ,idSocio, estado});
            if (!result) throw new Error("La asistencia no puede ser creada");

        }catch(e){
            throw e;
        }
        
    
}
}

export default AsistenciaController