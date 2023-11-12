import { SociosXCategorias } from "../models/index.js";

const seedSociosXCategorias = async () => {
    try {

        await SociosXCategorias.bulkCreate([
            {
                idSocio:1,
                idCategoria:1,
            },
            {
                idSocio:2,
                idCategoria:1,
            },
            {
                idSocio:3,
                idCategoria:1,
            },
            {
                idSocio:6,
                idCategoria:1,
            }
        ]);
    } catch (error) {
        console.log(error.message);
    }
};

export default seedSociosXCategorias;