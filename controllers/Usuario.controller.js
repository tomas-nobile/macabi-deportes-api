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
        domicilio,
        activo = true,
        idRol
      } = req.body;
      const result = await Usuario.create({
        nombre,
        apellido,
        email,
        clave,
        dni,
        fechaNacimiento,
        domicilio,
        telefono,
        activo,
        idRol
      });
      if (!result) throw new Error("El usuario no pudo ser creado");
      res
        .status(200)
        .send({ success: true, message: "Usuario creado con exito" });
    } catch (error) {
      next(error)
    }
  };


  getAllUsers = async (req, res, next) => {
    try {
      const result = await Usuario.findAll({
        attributes: [
          "nombre",
          "apellido",
          "email",
          "domicilio",
          "clave",
          "dni",
          "fechaNacimiento",
          "telefono",
          "activo",
          "idRol"
        ],
        // include: [
        //   {
        //     model: Role,
        //     attributes: ["role"],
        //     as: "role",
        //   },
        // ],
      });
      res
        .status(200)
        .send({ success: true, message: "Cantidad de usuarios: "+ result.length+" Usuarios encontrados:", result });
    } catch (error) {
      //res.status(400).send({ success: false, message: error.message });
      next(error);
    }
  };

  getUserById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await Usuario.findOne({
        where: {
          idUsuario: id,
        },
        attributes: [
          "idUsuario",
          "nombre",
          "apellido",
          "email",
          "domicilio",
          "dni",
          "fechaNacimiento",
          "telefono",
          "activo",
          "idRol"
        ],
        // include: [
        //   {
        //     model: Role,
        //     attributes: ["role"],
        //     as: "role",
        //   },
        // ],
      });
      if (!result) throw new Error("No se encontro usuario con ese id");
      res
        .status(200)
        .send({ success: true, message: "Usuario encontrado:", result });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };


  patchUserById = async (req, res, next) => {
    console.log("🚀 ~ file: Usuario.controller.js:113 ~ UsuarioController ~ patchUserById= ~ req:", req.body)
    try {
      const { id } = req.params;
      const {
        nombre,
        apellido,
        email,
        dni,
        domicilio,
        fechaNacimiento,
        telefono,
        activo,
        idRol
      } = req.body;
      const result = await Usuario.update(
        {
          nombre,
          apellido,
          email,
          dni,
          domicilio,
          fechaNacimiento,
          telefono,
          activo,
          idRol
        },
        {
          where: {
            idUsuario: id,
          },
        }
      );
      if (!result) throw new Error("No se pudo modificar el usuario.");
      res
        .status(200)
        .send({ success: true, message: "Usuario modificado con exito" });
    } catch (error) {
      res.status(400).send({ success: false, message: error });
    }
  };

  deleteUserById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await Usuario.destroy({
        where: {
          idUsuario: id,
        },
      });
      if (!result) throw new Error("No se pudo eliminar el usuario.");
      res
        .status(200)
        .send({
          success: true,
          message: "Usuario eliminado con exito.",
          result,
        });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}


export default UsuarioController;