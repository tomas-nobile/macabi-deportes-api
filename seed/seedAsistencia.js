import { Asistencia } from "../models/index.js";

const seedAsistencia = async () => {
    try {

        await Asistencia.bulkCreate([
            {
              "idFecha": 1,
              "idSocio": 1,
              "estado": 'P'
            },
            {
              "idFecha": 1,
              "idSocio": 2,
              "estado": null
            },
            {
              "idFecha": 1,
              "idSocio": 3,
              "estado": 'P'
            },
            {
              "idFecha": 1,
              "idSocio": 6,
              "estado": 'A'
            },
            {
              "idFecha": 2,
              "idSocio": 1,
              "estado": 'P'
            },
            {
              "idFecha": 2,
              "idSocio": 2,
              "estado": 'P'
            },
            {
              "idFecha": 2,
              "idSocio": 3,
              "estado": 'P'
            },
            {
              "idFecha": 2,
              "idSocio": 6,
              "estado": 'J'
            },
            {
              "idFecha": 3,
              "idSocio": 1,
              "estado": 'A'
            },
            {
              "idFecha": 3,
              "idSocio": 2,
              "estado": 'J'
            },
            {
              "idFecha": 3,
              "idSocio": 3,
              "estado": 'J'
            },
            {
              "idFecha": 3,
              "idSocio": 6,
              "estado": 'J'
            },
            {
              "idFecha": 4,
              "idSocio": 1,
              "estado": 'J'
            },
            {
              "idFecha": 4,
              "idSocio": 2,
              "estado": 'J'
            },
            {
              "idFecha": 5,
              "idSocio": 6,
              "estado": 'A'
            },
          ]
          );
    } catch (error) {
        console.log(error.message);
    }
};

export default seedAsistencia;