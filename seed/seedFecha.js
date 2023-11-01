import { Fecha } from "../models/index.js";

const seedFecha = async () => {
    try {

        await Fecha.bulkCreate([
            {
                "idCategoria": 1,
                "fechaCalendario": "2023-11-03",
                "tipo": "E"
            },
            {
                "idCategoria": 1,
                "fechaCalendario": "2023-11-02",
                "tipo": "E"
            },
            {
                "idCategoria": 1,
                "fechaCalendario": "2023-11-10",
                "tipo": "E"
            }
        ]
        );
    } catch (error) {
        console.log(error.message);
    }
};

export default seedFecha;