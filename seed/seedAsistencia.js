import { Asistencia } from "../models/index.js";

const seedAsistencia = async () => {
    try {

        await Asistencia.bulkCreate([
            {
              "idFecha": 2,
              "idSocio": 3,
              "estado": null
            },
            {
              "idFecha": 3,
              "idSocio": 3,
              "estado": null
            }
          ]
          );
    } catch (error) {
        console.log(error.message);
    }
};

export default seedAsistencia;