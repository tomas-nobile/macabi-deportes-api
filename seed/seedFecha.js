import { Fecha } from "../models/index.js";

const seedFecha = async () => {
    try {

        await Fecha.bulkCreate([
            {
                idCategoria: 1,
                fechaCalendario: "2023-04-06",
                tipo: "E"
            },
            {
                idCategoria: 1,
                fechaCalendario: "2023-07-01",
                tipo: "E"
            },
            {
                idCategoria: 1,
                fechaCalendario: "2023-08-01",
                tipo: "E"
            },
            {
                idCategoria: 1,
                fechaCalendario: "2023-11-02",
                tipo: "E"
            },

            {
                idCategoria: 1,
                fechaCalendario: "2023-07-06",
                tipo: "E"
            },
        ]
        );
    } catch (error) {
        console.log(error.message);
    }
};

export default seedFecha;