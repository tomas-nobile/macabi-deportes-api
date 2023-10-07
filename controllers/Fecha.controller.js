import { Fecha } from "../models/index.js";

class FechaController {

    constructor() { }

    createFecha = async (req, res, next) => {
        try {

            const { fechaCalendario , tipo} = req.body;

            console.log(fechaCalendario);

            const result = await Fecha.create({ fechaCalendario , tipo });
            if (!result) throw new Error("La fecha no puede ser creada");
            res
                .status(200)
                .send({ success: true, message: "Fecha creada con exito" });
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    };
}

export default FechaController