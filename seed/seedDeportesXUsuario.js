import { DeportesXUsuario } from "../models/index.js";

const seedDeportesXUsuario = async () => {
    try {

        await DeportesXUsuario.bulkCreate([
            {
                idUsuario: 2,
                idDeporte: 1
            },
            {
                idUsuario: 3,
                idDeporte: 1
            },
            {
                idUsuario: 2,
                idDeporte: 2
            },
            {
                idUsuario: 2,
                idDeporte: 3
            },
            {
                idUsuario: 2,
                idDeporte: 4
            },

        ]);
    } catch (error) {
        console.log(error.message);
    }
};

export default seedDeportesXUsuario;