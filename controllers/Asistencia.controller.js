import { Asistencia, Socio } from "../models/index.js";

class AsistenciaController {

    constructor() { }

    createAsistencia = async (req, res, next) => {
        try {

            const { idFecha ,idSocio, estado} = req.body;

            const result = await Asistencia.create({idFecha ,idSocio, estado});
            if (!result) throw new Error("La asistencia no puede ser creada");
            res
                .status(200)
                .send({ success: true, message: "Asistencia creada con exito" });
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    };

    

    crearAsistenciaAuxiliar = async (idFecha,idSocio,estado) => {
        try {

            const result = await Asistencia.create({idFecha ,idSocio, estado});
            if (!result) throw new Error("La asistencia no puede ser creada");

        }catch(e){
            throw e;
        }
        
    
}

getAsistenciaFecha = async (req, res) => {
    const { idFecha } = req.params;
    try {
      const asistencias = await Asistencia.findAll({
        where: { idFecha },
        attributes: ['idSocio', 'estado'],
      });
  
      if (asistencias.length === 0) {
        res.status(200).send({ success: true, message: 'No hay socios cargados en esta fecha', result: [] });
      } else {
        // Obtener los idSocio de las asistencias
        const idSocios = asistencias.map(asistencia => asistencia.idSocio);
  
        // Consultar los nombres y apellidos de los socios basado en los idSocio
        const socios = await Socio.findAll({
          where: { idSocio: idSocios }, // Filtrar por los idSocio
          attributes: ['idSocio', 'nombre', 'apellido'], // Seleccionar los campos necesarios
        });
  
        // Mapear los nombres y apellidos de los socios a las asistencias
        const asistenciasConNombres = asistencias.map(asistencia => {
          const socio = socios.find(s => s.idSocio === asistencia.idSocio);
          return {
            idSocio: asistencia.idSocio,
            nombreSocio: socio ? socio.nombre : 'Socio no encontrado',
            apellidoSocio: socio ? socio.apellido : 'Socio no encontrado',
            estado: asistencia.estado,
          };
        });
  
        res.status(200).send({ success: true, message: 'Asistencias encontradas:', result: asistenciasConNombres });
      }
    } catch (error) {

    }
  };


  async deleteSocioFecha(){
    try {
      const { idFecha,idSocio } = req.params;
      await Asistencia.destroy({where: {idSocio,idFecha}});
      res.status(200).send({ success: true, message: `Socio: "${socioFecha.idSocio} fue borrado de la fecha ${socioFecha.idFecha}"` });
    } catch (error) {
      console.error('Error al obtener las asistencias:', error);
      res.status(500).json({ error: `Error al borrar socio "${socioFecha.idSocio}"  de la fecha "${socioFecha.idFecha}"` });
    }

  }
    
}

export default AsistenciaController