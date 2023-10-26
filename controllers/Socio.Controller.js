import { Socio, infoContacto } from "../models/index.js";

class SocioController {
  constructor() {}

   
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

      let emailFormated;

      if (email.includes("@")) {
        const emailSplited = email.split("@");
        emailFormated = emailSplited[0] + "@" + emailSplited[1].toLowerCase();
      } else {
        emailFormated = email;
      }

      const result = await Socio.create({
        nroSocio,
        nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase(),
        apellido:
          apellido.charAt(0).toUpperCase() + apellido.slice(1).toLowerCase(),
        dni,
        email: emailFormated,
        telefono,
        direccion,
        fechaNacimiento,
        observaciones,
      });

      if (!result) throw new Error("El socio no pudo ser creado");

      res
        .status(200)
        .send({ success: true, message: "Socio creado con exito", result });
    } catch (error) {
      next(error);
    }
  };

  traerSocioPorId = async (req, res, next) => {
    try {
      const { idSocio } = req.params;

      const result = await Socio.findOne({
        where: {
          idSocio,
        },
        attributes: [
          "idSocio",
          "nroSocio",
          "nombre",
          "apellido",
          "dni",
          "email",
          "telefono",
          "direccion",
          "fechaNacimiento",
          "observaciones",
        ],
        include: [
          {
            model: infoContacto,
            attributes: [
              "idInfoContacto",
              "idSocio",
              "nombre",
              "apellido",
              "email",
              "telefono",
            ],
          },
        ],
      });

      if (!result) {
        const error = new Error(
          `el socio con ID ${idSocio} no se encuentra en la base de datos`
        );
        error.status = 400;
        throw error;
      }

      res
        .status(200)
        .send({ success: true, message: "socios encontrados:", result });
    } catch (error) {
      next(error);
    }
  };

  traerTodosLosSocios = async (req, res, next) => {
    try {
      const result = await Socio.findAll({
        attributes: [
          "idSocio",
          "nroSocio",
          "nombre",
          "apellido",
          "dni",
          "email",
          "telefono",
          "direccion",
          "fechaNacimiento",
          "observaciones",
        ],
        include: [
          {
            model: infoContacto,
            attributes: [
              "idInfoContacto",
              "idSocio",
              "nombre",
              "apellido",
              "email",
              "telefono",
            ],
          },
        ],
      });

      if (result.length == 0) {
        const error = new Error("no hay socios cargados aun");
        error.status = 400;
        throw error;
      }

      res
        .status(200)
        .send({ success: true, message: "socios encontrados:", result });
    } catch (error) {
      next(error);
    }
  };

  updateSocio = async (req, res, next) => {
    try {
      const { idSocio } = req.params;
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
      const result = await Socio.update(
        {
          nroSocio,
          nombre,
          apellido,
          dni,
          email,
          telefono,
          direccion,
          fechaNacimiento,
          observaciones,
        },
        {
          where: {
            idSocio: idSocio,
          },
        }
      );
      if (!result) throw new Error("No se pudo modificar el sociop.");
      res
        .status(200)
        .send({ success: true, message: "Socio modificado con exito" });
    } catch (error) {
      res.status(400).send({ success: false, message: error });
    }
  };

  getSocioPorDni = async (req, res, next) => {
    try{
        const {dni} = req.params;
        console.log("Che, esta llegando aca" + dni);

        const result = await Socio.findOne({
            where: {
                dni,
            },
            attributes:["idSocio","nroSocio","nombre","apellido","dni"],
        });
        if(!result){
            const error = new Error("No existe socio con el dni " + dni + " en la base de datos")
            error.status = 400;
            throw error;
        }

        console.log("Se llego bien.." + result);
        res
        .status(200)
        .json({ success: true, message: "Socio encontrado:", result });

    }catch(e){
        next(e);
    }

}
//En vez de hacerlo tdo en uno lo divido para poder reutilizarlos.
getSocioPorNroSocio = async (req, res, next) => {
    try{
        const {nroSocio} = req.params;
        console.log("Che, esta llegando aca");
        const result = await Socio.findOne({
            where: {
                nroSocio,
            },
            attributes:["idSocio","nroSocio","nombre","apellido","dni"],
        });
        if(!result){
            const error = new Error("No existe socio con el nroSocio " + nroSocio + " en la base de datos")
            error.status = 400;
            throw error;
        }
        res
        .status(200)
        .json({ success: true, message: "Socio encontrado:", result });

    }catch(e){
        next(e);
    }

}
}

export default SocioController;
