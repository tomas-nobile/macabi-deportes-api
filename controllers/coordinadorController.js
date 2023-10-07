import Coordinador from "../models/coordinador";

class CoordinadorController {
    constructor() {}


crearCoordinador = async (req, res, next) => {
    try {

  
    const {
        dni,idDeporte,idInfoSocio 
    } = req.body;

    const result = await Coordinador.create({
        dni,idDeporte,idInfoSocio 
    });
    if (!result) throw new Error("El coordinador no pudo ser creado");
    res
    .status(200)
    .send({ success: true, message: "Coordinador creado con exito" });

}catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
}
}

export default CoordinadorController;

