import { Fecha } from "../models/index.js";
import AsistenciaController from "./Asistencia.controller.js";
import SociosXCategoriasController from "./SociosXCategoriasController.js";
class FechaController {

    constructor() { }

    createFecha = async (req, res, next) => {
        try {
            const {
                idCategoria,
                fechaCalendario,
                tipo,
                idSocios
            } = req.body;

            if (await this.existeFecha(idCategoria, fechaCalendario)) {
                throw new Error("La fecha no puede ser creada porque ya existe esta fecha en esta categoria");
            }

            const result = await Fecha.create({
                idCategoria,
                fechaCalendario,
                tipo
            });

            if (!result) throw new Error("La fecha no puede ser creada");
            
            const asistenciaController = new AsistenciaController()

            if (result) {

                if (tipo === "E") {
                    const sociosXCategoriasController = new SociosXCategoriasController();
                    try {
                        const socios = await sociosXCategoriasController.getSociosByIdCategoria(idCategoria);
                        if (socios) {
                            socios.forEach(socio => {
                                asistenciaController.crearAsistencia2(result.dataValues.idFecha, socio.dataValues.idSocio, null)
                            });
                        }
                    } catch (e) {
                        console.log("Hubo un error:", error);
                    }


                } else {
                    try {
                        idSocios.forEach(socio => {
                            asistenciaController.crearAsistencia2(result.dataValues.idFecha, socio.idSocio, null)
                        });
                    } catch (e) {
                        console.log("Hubo un error con las citaciones:", error);

                    }

                }


            }
            res
                .status(200)
                .send({ success: true, message: "Fecha creada con exito" });
        } catch (error) {

            next(error);
            
        }
    };

    existeFecha = async (idCategoria, fechaCalendario) => {
        let existe = false
        try {

            const result = await Fecha.findOne({
                attributes: ['idCategoria', 'fechaCalendario'], where: { idCategoria: idCategoria, fechaCalendario: fechaCalendario },
            })

            if (result) {
                existe = true
            } else {

            }

            return existe
        } catch (e) {
            console.log(e);
        }

    }

}

export default FechaController