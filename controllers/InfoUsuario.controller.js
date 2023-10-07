import { InfoUsuario} from "../models/index.js";

class UserController {
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
        activo
      } = req.body;
      const result = await InfoUsuario.create({
        nombre,
        apellido,
        email,
        clave,
        dni,
        fechaNacimiento,
        telefono,
        activo,
        roleId: 2,
      });
      if (!result) throw new Error("El usuario no pudo ser creado");
      res
        .status(200)
        .send({ success: true, message: "Ususario creado con exito" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

}


export default UserController;