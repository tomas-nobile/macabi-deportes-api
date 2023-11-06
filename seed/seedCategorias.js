import { Categoria } from "../models/index.js";

const seedCategoria = async () => {
    try {

        await Categoria.bulkCreate([
            {
                nombreCategoria: "2004",
                idDeporte:1,
            },
            {
                nombreCategoria: "2004",
                idDeporte:2,
            },
            {
                nombreCategoria: "2004",
                idDeporte:3,
            },
            {
                nombreCategoria: "2004",
                idDeporte:4,
            },

        ]);
    } catch (error) {
        console.log(error.message);
    }
};

export default seedCategoria;