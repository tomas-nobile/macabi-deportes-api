import Socio from "../models/Socio.js";

class SocioController {
    constructor() { }

    crearSocio = async (req, res, next) => {

        try {
            const {
                nroSocio,
                nombre,
                apellido,
                dni,
                email,
                telefono,
                direccion,
                fechaNacimiento,
                observaciones,
            } = req.body;

            let emailFormated

            if (email.includes('@')){
                const emailSplited = email.split('@')
                emailFormated = emailSplited[0] + "@" + emailSplited[1].toLowerCase();
            } else {
                emailFormated = email
            }

            

            const result = await Socio.create({
                nroSocio,
                nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase(),
                apellido: apellido.charAt(0).toUpperCase() + apellido.slice(1).toLowerCase(),
                dni,
                email: emailFormated,
                telefono,
                direccion,
                fechaNacimiento,
                observaciones
            });

            if (!result) throw new Error("El socio no pudo ser creado");

            res
                .status(200)
                .send({ success: true, message: "Socio creado con exito", result });

        } catch (error) {
            next(error)
        }
    }
}

export default SocioController;