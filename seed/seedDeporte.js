import { Deporte } from "../models/index.js";

const seedDeporte = async () => {
    try {

        await Deporte.bulkCreate([
            {
                nombre: "Voley"
            },
            {
                nombre: "Futbol"
            },
            {
                nombre: "Basket"
            },
            {
                nombre: "Caza de Ballenas Olimpica"
            },
            {
                nombre: "Scuba Diving"
            },

        ]);
    } catch (error) {
        console.log(error.message);
    }
};

export default seedDeporte;