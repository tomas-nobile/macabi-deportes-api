import { Usuario } from "../models/index.js";
import { generateToken } from "../utils/tokens.js";

class UsuarioController {
  constructor() { }

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
        .send({ success: true, message: "Usuario creado con exito" });
    } catch (error) {
      next(error)
    }
  };

  logIn = async (req, res, next) => {
    try {
      const { email, clave } = req.body;

      const result = await Usuario.findOne({
        where: {
          email
        }
      });

      if (!result) {
        const error = new Error("El Email es incorrecto");
        error.status = 400;
        throw error;
      };

      const claveCorrecta = await result.validaClave(clave);

      if (!claveCorrecta) {
        const error = new Error("La clave es incorrecta");
        error.status = 400;
        throw error;
      };

      //tomamos los datos del usuario que necesitamos para generar el token
      const payload = {
        idUsuario: result.idUsuario,
        nombre: result.nombre,
        apellido: result.apellido,
        email: result.email,
        idRol: result.idRol,
      };


      //generamos el token 
      const token = generateToken(payload)

      res.cookie('tokenMacabi', token)

      res
        .status(200)
        .send({ success: true, message: "Usuario Logeado Exitosamente", payload });

    } catch (error) {
      next(error)
    }

  }

  logout = async (req, res, next) => {
    try {
      res.cookie('tokenMacabi', '')

      res
        .status(200)
        .send({ success: true, message: 'Usuario Deslogueado' });

    } catch (error) {

      next(error);
    }
  };

  me = async (req, res, next) => {

    try { 
        const { user } = req
        res
            .status(200)
            .send({ success: true, message: "Usuario", user });

    } catch (error) {
        next(error);

    }
};

}


export default UsuarioController;