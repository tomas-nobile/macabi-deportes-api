import { CategoriasXUsuario } from "../models/index.js";

const seedCategoriaXUsuario = async () => {
    try {
        await CategoriasXUsuario.bulkCreate([
            {
                idUsuario: 4,
                idCategoria: 1
            },
            {
                idUsuario: 5,
                idCategoria: 1
            },
            {
                idUsuario: 4,
                idCategoria: 2
            },
            {
                idUsuario: 5,
                idCategoria: 3
            },

        ]);
    } catch (error) {
        console.log(error.message);
    }
};

export default seedCategoriaXUsuario;