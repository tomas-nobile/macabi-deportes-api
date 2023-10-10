import Socio from "../models/Socio.js";

class SocioController {
    constructor() { }

    crearSocio = async (req, res, next) => {
        try {
            const { nroSocio, nombre, apellido, dni, email, telefono, direccion, fechaNacimiento, observaciones } = req.body;

            const result = await Socio.create({
                nroSocio,
                nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase(),
                apellido: apellido.charAt(0).toUpperCase() + apellido.slice(1).toLowerCase(),
                dni,
                email,
                telefono,
                direccion,
                fechaNacimiento,
                observaciones
            });

            if (!result) throw new Error("El socio no pudo ser creado");

            res
                .status(200)
                .send({ success: true, message: "Socio creado con exito" });
                
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    }
}

export default SocioController;