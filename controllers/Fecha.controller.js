import { Fecha , Categoria} from "../models/index.js";
import AsistenciaController from "./Asistencia.controller.js";
import SociosXCategoriasController from "./SociosXCategoriasController.js";
class FechaController {

    constructor() { }

    createFecha = async (req, res, next) => {
        try {
            const {
                idCategoria,
                fechaCalendario,
                tipo,
                idSocios
            } = req.body;

            if (await this.existeFecha(idCategoria, fechaCalendario)) {
                throw new Error("La fecha no puede ser creada porque ya existe esta fecha en esta categoria");
            }

            const result = await Fecha.create({
                idCategoria,
                fechaCalendario,
                tipo
            });

            if (!result) throw new Error("La fecha no puede ser creada");
            
            const asistenciaController = new AsistenciaController()

            if (result) {

                if (tipo === "E") {
                    const sociosXCategoriasController = new SociosXCategoriasController();
                    try {
                        const socios = await sociosXCategoriasController.getSociosByIdCategoria(idCategoria);
                        if (socios) {
                            socios.forEach(socio => {
                                asistenciaController.crearAsistenciaAuxiliar(result.dataValues.idFecha,socio.dataValues.idSocio,null)
                            });
                        }
                    } catch (e) {
                        console.log("Hubo un error:", error);
                    }


                } else {
                    try {
                        idSocios.forEach(socio => {
                            asistenciaController.crearAsistenciaAuxiliar(result.dataValues.idFecha,socio.idSocio,null)
                        });
                    } catch (e) {
                        console.log("Hubo un error con las citaciones:", error);

                    }

                }


            }
            res
                .status(200)
                .send({ success: true, message: "Fecha creada con exito" });
        } catch (error) {

            next(error);
            
        }
    };

    eliminarFecha = async (req, res,next) => {
      const {idFecha} = req.params;

      try {

        let result =  await Fecha.destroy({
          where: {
            idFecha
          },
        });

        if(!result){
          throw new Error("No existe fecha seleccionada")
        }

        res
                .status(200)
                .send({ success: true, message: "Fecha eliminada con éxito" });

      }catch(e){
        next(e)
      }
    }

    existeFecha = async (idCategoria, fechaCalendario) => {
        let existe = false
        try {

            const result = await Fecha.findOne({
                attributes: ['idCategoria', 'fechaCalendario'], where: { idCategoria: idCategoria, fechaCalendario: fechaCalendario },
            })

            if (result) {
                existe = true
            } else {

            }

            return existe
        } catch (e) {
            console.log(e);
        }

 }
 getFechasDeCategoria = async (req, res) => {
  const { idCategoria } = req.params;
  try {
    const result = await Fecha.findAll({
      where: { idCategoria }, // Filtra por idCategoria
      attributes: ['idFecha', 'idCategoria', 'fechaCalendario', 'tipo'],
      include: [
        {
          model: Categoria,
          attributes: ['nombreCategoria'],
        },
      ],
    });

    if (result.length == 0) {
      res.status(200).send({ success: true, message: `No hay fechas en la base de datos para esta categoría`, result: [] });
    } else {
      res.status(200).send({ success: true, message: 'Fechas encontradas:', result });
    }
  } catch (error) {
    console.error('Error al obtener las fechas:', error);
    res.status(500).json({ error: 'Error al obtener las fechas' });
  }
};
 

  getAllFechas = async (req, res) => {
    try {
      const result = await Fecha.findAll({
        attributes: ['idFecha', 'idCategoria', 'fechaCalendario', 'tipo'],
        include: [
          {
            model: Categoria,
            attributes: ['nombreCategoria'],
          },
        ],
      });
  
      if (result.length == 0) {
        const error = new Error('No hay fechas en la base de datos');
        error.status = 400;
        throw error;
      }
  
      res.status(200).send({ success: true, message: 'Fechas encontradas:', result });
    } catch (error) {
      console.error('Error al obtener las fechas:', error);
      res.status(500).json({ error: 'Error al obtener las fechas' });
    }
  };

  getDatosFecha = async (req, res) => {
  const { idFecha } = req.params;
  try {
    const fecha = await Fecha.findOne({
      where: { idFecha },
      attributes: ['idCategoria', 'fechaCalendario', 'tipo'],
    });

    if (!fecha) {
      res.status(404).send({ success: false, message: 'Fecha no encontrada' });
    } else {
      const idCategoria = fecha.idCategoria;

      const result = await Fecha.findAll({
        where: { idCategoria, fechaCalendario: fecha.fechaCalendario, tipo: fecha.tipo },
        attributes: ['idFecha', 'idCategoria', 'fechaCalendario', 'tipo'],
        include: [
          {
            model: Categoria,
            attributes: ['nombreCategoria'],
          },
        ],
      });

      res.status(200).send({ success: true, message: 'Datos de la fecha encontrados:', result });
    }
  } catch (error) {
    console.error('Error al obtener los datos de la fecha:', error);
    res.status(500).json({ error: 'Error al obtener los datos de la fecha' });
  }
};


patchFechaById = async (req, res, next) => {
  try {
    const { idFecha } = req.params;
    const {
      fechaCalendario,
      idCategoria
    } = req.body;

    await this.existeFechaModificar(idCategoria,fechaCalendario,idFecha)
    const result = await Fecha.update(
      {
        fechaCalendario
      },
      {
        where: {
          idFecha
        },
      }
    );

    if(!result) throw "Fallo al editar la fecha"
    res
      .status(200)
      .send({ success: true, message: "Fecha modificada con exito" });
  } catch (e) {
    res.status(400).send({ success: false, message: e.message })
  }
};


existeFechaModificar = async (idCategoria, fechaCalendario,idFecha) => {
    const result = await Fecha.findOne({
        attributes: [ 'fechaCalendario','idFecha'], where: { idCategoria: idCategoria, fechaCalendario: fechaCalendario },
    })
    

  if(result && result.dataValues.idFecha != idFecha) throw "La fecha seleccionada ya esta siendo utilizada"

}

}

export default FechaController