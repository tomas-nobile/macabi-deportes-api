import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class CategoriasXUsuario extends Model { }

CategoriasXUsuario.init({
    idUsuario: {
        type: DT.INTEGER,
        primaryKey: true,
    },
    idCategoria: {
        type: DT.INTEGER,
        primaryKey: true,
    }
},
    {
        sequelize: connection,
        modelName: "CategoriasXUsuario",
        timestamps: false
    }
)

export default CategoriasXUsuario;
