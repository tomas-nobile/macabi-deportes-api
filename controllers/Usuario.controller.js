
import {
  Usuario,
  DeportesXUsuario,
  Deporte,
  Categoria,
  Rol
} from "../models/index.js";
import { generateToken } from "../utils/tokens.js";

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
        idRol,
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


  traerUsuarioPorId = async (req, res, next) => {
    try {
      const { idUsuario } = req.params;

      const result = await Usuario.findOne({
        where: {
          idUsuario,
        },
        attributes: ["idUsuario", "nombre", "apellido", "email"],
        include: [
          {
            model: Rol,
            attributes: ["tipo"],
          },
        ],
      });

      if (!result) {
        const error = new Error(
          `el usuarion con ID ${idUsuario} no se encuntra en la base de datos`
        );
        error.status = 400;
        throw error;
      }

      res
        .status(200)
        .send({ success: true, message: "usuarios encontrados:", result });

        
    } catch (error) {
      next(error);
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

  traerTodosLosUsuarios = async (req, res, next) => {
    try {
      const result = await Usuario.findAll({
        attributes: [
          "idUsuario",
          "nombre",
          "apellido",
          "fechaNacimiento",
          "dni",
          "email",
          "clave",
          "salt",
          "telefono",
          "direccion",
          "estado",
          "idRol",
        ],
        include: [
          {
            model: Rol,
            attributes: ["tipo"],
          },
        ],
      });

      if (result.length == 0) {
        const error = new Error("no hay usuarios cargados aun");
        error.status = 400;
        throw error;
      }

      res
        .status(200)
        .send({ success: true, message: "usuarios encontrados:", result });
    } catch (error) {
      next(error);
    }
  };

  traerTodosLosUsuariosXRol = async (req, res, next) => {
    try {
      const { idRol } = req.params;
      const result = await Usuario.findAll({
        where: {
          idRol,
        },
        attributes: [
          "idUsuario",
          "nombre",
          "apellido",
          "fechaNacimiento",
          "dni",
          "email",
          "clave",
          "salt",
          "telefono",
          "direccion",
          "estado",
          "idRol",
        ],
        include: [
          {
            model: Rol,
            attributes: ["tipo"],
          },
        ],
      });

      if (result.length == 0) {
        const error = new Error(`no hay usuarios con ${idRol} aun`);
        error.status = 400;
        throw error;
      }

      res
        .status(200)
        .send({ success: true, message: "usuarios encontrados:", result });
    } catch (error) {
      next(error);
    }
  };

  obtenerCategoriasPorProfesor = async (req, res, next) => {
    try {
      const { idUsuario } = req.params;
      let message = "Categorías encontradas:"

      const usuario = await Usuario.findOne({
        where: {
          idUsuario,
        },
        include: [
          {
            model: Rol,
            attributes: ["tipo"],
          },
        ],
      });
  
      if (!usuario) {
        const error = new Error(
          `El usuario con ID ${idUsuario} no se encuentra en la base de datos`
        );
        error.status = 400;
        throw error;
      }

      if (usuario.Rol.tipo === "P") {
        const categorias = await Categoria.findAll({
          where: {
            idUsuario,
          },
          attributes: ["idCategoria", "nombreCategoria", "idDeporte"],
        });
  
        if (!categorias || categorias.length === 0) {
          message = "No hay categorías asociadas a este profesor.";
          
        }
  
        res.status(200).send({ success: true, message, categorias });
      } else {
        const error = new Error("El usuario no es de tipo Profesor");
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  };
  
  obtenerDeportesPorCoordinador = async (req, res, next) => {
    try {
      const { idUsuario } = req.params;
      let message = "Deportes encontrados:"

      const usuario = await Usuario.findOne({
        where: {
          idUsuario,
        },
        include: [
          {
            model: Rol,
            attributes: ["tipo"],
          },
        ],
      });
  
      if (!usuario) {
        const error = new Error(
          `El usuario con ID ${idUsuario} no se encuentra en la base de datos`
        );
        error.status = 400;
        throw error;
      }
  
      if (usuario.Rol.tipo === "C") {
        const idDeportes = await DeportesXUsuario.findAll({
          where: {
            idUsuario,
          },
          attributes: ["idDeporte"],
        });

        const deportes = await Deporte.findAll({
          where: {
            idDeporte: idDeportes.map((idDeporte) => idDeporte.idDeporte),
          },
        });
  
        if (!deportes || deportes.length === 0) {
          message = "No hay deportes asociados a este coordinador.";
        }
  
        res.status(200).send({ success: true, message, deportes });
      } else {
        const error = new Error("El usuario no es de tipo Coordinador");
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  };
  
}

export default UsuarioController;
