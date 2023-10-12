import { Usuario} from "../models/index.js";

class UsuarioController {
    constructor() {}

  createUser = async (req, res, next) => {
    try {
      const {
        nombre,
        apellido,
        email,
        clave,
        dni,
        fechaNacimiento,
        telefono,
        activo,
        idRol
      } = req.body;
      const result = await Usuario.create({
        nombre,
        apellido,
        email,
        clave,
        dni,
        fechaNacimiento,
        telefono,
        activo,
        idRol,
      });
      if (!result) throw new Error("El usuario no pudo ser creado");
      res
        .status(200)
        .send({ success: true, message: "Ususario creado con exito" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

   getUserProfesores = async (req, res, next) => {
    try {
      const profesores = await Usuario.findAll({
        where: { idRol: 3 }, 
      });
  
      res.status(200).send({ success: true, message: "Profesores encontrados:", profesores });
    } catch (error) {
      next(error);
    }
  };

}


export default UsuarioController;