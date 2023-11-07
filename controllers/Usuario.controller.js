import CategoriasXUsuario from "../models/CategoriasXUsuario.js";
import { Usuario, DeportesXUsuario, Deporte, Categoria, Rol } from "../models/index.js";
import categoriaRoutes from "../routes/Categoria.Routes.js";
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
        direccion,
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
        direccion,
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
          "direccion",
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
          "direccion",
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
    try {
      const { id } = req.params;
      const {
        nombre,
        apellido,
        email,
        dni,
        direccion,
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
          direccion,
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
        const error = new Error("Mail o clave incorrecta");
        error.status = 400;
        throw error;
      };

      const claveCorrecta = await result.validaClave(clave);

      if (!claveCorrecta) {
        const error = new Error("Mail o clave incorrecta");
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
        direccion,
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
        direccion,
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
          "idUsuario",
          "nombre",
          "apellido",
          "email",
          "direccion",
          "dni",
          "fechaNacimiento",
          "telefono",
          "activo",
          "idRol"
        ],
        include: [
          {
            model: Rol,
            attributes: ["tipo"],
          },
        ],
      });
      res
        .status(200)
        .send({ success: true, message: "Cantidad de usuarios: " + result.length + " Usuarios encontrados:", result });
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req, res, next) => {
    try {
      const { idUsuario } = req.params;
      const result = await Usuario.findOne({
        where: {
          idUsuario,
        },
        attributes: [
          "idUsuario",
          "nombre",
          "apellido",
          "email",
          "direccion",
          "dni",
          "fechaNacimiento",
          "telefono",
          "activo",
          "idRol",
        ],
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
        .send({ success: true, message: "Usuario encontrado:", result });

    } catch (error) {
      next(error);
    }
  };

  getUsersByRol = async (req, res, next) => {

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
          "telefono",
          "direccion",
          "activo",
        ],
        include: [
          {
            model: Rol,
            attributes: ["tipo"],
          },
        ],
      });

      if (result.length == 0) {
        const error = new Error(`no hay usuarios con idRol: ${idRol} aun`);
        error.status = 400;
        throw error;
      }

      res
        .status(200)
        .send({ success: true, message: `usuarios con idRol: ${idRol} encontrados:`, result });
    } catch (error) {
      next(error);
    }
  };

  patchUserById = async (req, res, next) => {

    try {
      const { idUsuario } = req.params;
      const {
        nombre,
        apellido,
        email,
        dni,
        direccion,
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
          direccion,
          fechaNacimiento,
          telefono,
          activo,
          idRol
        },
        {
          where: {
            idUsuario,
          },
        }
      );

      if (!result) throw new Error("No se pudo modificar el usuario.");

      res
        .status(200)
        .send({ success: true, message: "Usuario modificado con exito" });
    } catch (error) {

      next(error)
    }
  };

  deleteUserById = async (req, res, next) => {
    try {

      const { idUsuario } = req.params;

      const result = await Usuario.destroy({
        where: {
          idUsuario,
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

  getCategoriasPorProfesor = async (req, res, next) => {
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

        let categorias = await Usuario.findOne({
          where: {
            idUsuario,
          },
          attributes: [],
          include:{ model: Categoria, attributes: ["idCategoria", "nombreCategoria"],as: "CategoriasAsignadas", through:{attributes:[]}}
        });

        if (!categorias.categoriasAsignadas || categorias.categoriasAsignadas.length == 0) {
          message = "No hay categorías asociadas a este profesor.";

        }

        

        res
          .status(200)
          .send({ success: true, message, categorias:categorias.CategoriasAsignadas });

      } else {

        const error = new Error("El usuario no es de tipo Profesor");
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  };

  getDeportesPorCoordinador = async (req, res, next) => {
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


  async existeProfesorPorId(idUsuario){
    let existe = false;
    
    try {

      const result = await Usuario.findOne({
        where: {
          idUsuario,
        },

      })
      console.log("-------------- LLEGUE ACA-----------");
      if(result) {
        console.log("El usuario encontrado es: " + result.idUsuario);
        existe = true;
      }

      console.log("--------------EXISTE PROFE?:   " + existe + "-----------");

      return existe;

    }catch(e){

      throw new Error("Error en la validacion de la existencia de profesor")

    }
  }

  async getUsuarioPorId(idUsuario){

    try {

      const result = await Usuario.findOne({
        where:{
          idUsuario
        },
        attributes: [
          "idUsuario","nombre","apellido","dni","email"
        ],
      })

      if (!result) throw new Error("No se encontro usuario con ese id");

      return result

    }catch(e){
      throw e
    }

  }

   async validarTipo(idUsuario, rol){
    let esTipoProfesor = false;

    try {

      const usuarioResult = await Usuario.findOne({
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

      if (usuarioResult && usuarioResult.Rol.tipo === rol) {
        esTipoProfesor = true;
      }

      return esTipoProfesor;
      
    }catch(e){
      throw e
    }
    
   }

}
export default UsuarioController;

