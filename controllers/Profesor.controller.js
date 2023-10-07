import { Profesor } from "../models/index.js";

class ProfesorController {

    constructor() { }

    crearProfesor = async (req, res, next) => {
        try {

            const { idUsuario } = req.body;

            const result = await Profesor.create({idUsuario});
            if (!result) throw new Error("El profesor no puede ser creada");
            res
                .status(200)
                .send({ success: true, message: "profesor creado con exito" });
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    };
}

export default ProfesorController