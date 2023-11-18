import { Asistencia, Socio } from "../models/index.js";

class AsistenciaController {
  constructor() {}

  createAsistencia = async (req, res, next) => {
    try {
      const { idFecha, idSocio, estado } = req.body;

      const result = await Asistencia.create({ idFecha, idSocio, estado });
      if (!result) throw new Error("La asistencia no puede ser creada");
      res
        .status(200)
        .send({ success: true, message: "Asistencia creada con exito" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  crearAsistenciaAuxiliar = async (idFecha, idSocio, estado) => {
    try {
      const result = await Asistencia.create({ idFecha, idSocio, estado });
      if (!result) throw new Error("La asistencia no puede ser creada");
    } catch (e) {
      throw e;
    }
  };

  getAsistenciaFecha = async (req, res) => {
    const { idFecha } = req.params;
    try {
      const asistencias = await Asistencia.findAll({
        where: { idFecha },
        attributes: ["idSocio", "estado"],
      });

      if (asistencias.length === 0) {
        res
          .status(200)
          .send({
            success: true,
            message: "No hay socios cargados en esta fecha",
            result: [],
          });
      } else {
        // Obtener los idSocio de las asistencias
        const idSocios = asistencias.map((asistencia) => asistencia.idSocio);

        // Consultar los nombres y apellidos de los socios basado en los idSocio
        const socios = await Socio.findAll({
          where: { idSocio: idSocios }, // Filtrar por los idSocio
          attributes: ["idSocio", "nombre", "apellido"], // Seleccionar los campos necesarios
        });

        // Mapear los nombres y apellidos de los socios a las asistencias
        const asistenciasConNombres = asistencias.map((asistencia) => {
          const socio = socios.find((s) => s.idSocio === asistencia.idSocio);
          return {
            idSocio: asistencia.idSocio,
            nombre: socio ? socio.nombre : "Socio no encontrado",
            apellido: socio ? socio.apellido : "Socio no encontrado",
            estado: asistencia.estado,
          };
        });

        res
          .status(200)
          .send({
            success: true,
            message: "Asistencias encontradas:",
            result: asistenciasConNombres,
          });
      }
    } catch (error) {

      console.error("Error al obtener las asistencias:", error);
      res.status(500).json({ error: "Error al obtener las asistencias" });
    }
  };
  
 deleteSocioFecha = async (req, res) => {
    try {
      const { idFecha, idSocio } = req.params;
      await Asistencia.destroy({ where: { idSocio, idFecha } });
      res.status(200).send({ success: true, message: `Socio: "${idSocio}" fue borrado de la fecha ${idFecha}` });
    } catch (error) {
      console.error('Error al borrar socio de la fecha:', error);
      res.status(500).json({ error: `Error al borrar socio "${idSocio}" de la fecha "${idFecha}"` });
    }
  }

  deleteSocioFechaMetodoInterno = async (idFecha,idSocio) => {
    try {
      await Asistencia.destroy(
        { where: { idSocio, idFecha } 
      });
    } catch (error) {
      console.error('Error al borrar socio de la fecha:', error);
    }
  }

  modificarAsistencia = async (req, res) => {
    const { idFecha } = req.params;
    const cambiosAsistencia = req.body;
    try {
      console.log("Datos recibidos:", cambiosAsistencia);

      for (const cambio of cambiosAsistencia) {
        const { idSocio, estado } = cambio;

        let asistencia = await Asistencia.findOne({
          where: { idFecha, idSocio },
        });

       
          asistencia.estado = estado;
          await asistencia.save();
        
      }

      res
        .status(200)
        .send({ success: true, message: "Asistencias actualizadas con éxito" });
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).send({ success: false, message: "Error en el servidor" });
    }
  };
  
}
  

export default AsistenciaController;
