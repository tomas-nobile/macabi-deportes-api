import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class DeportesXUsuario extends Model { }

DeportesXUsuario.init({
    idUsuario: {
        type: DT.INTEGER,
        primaryKey: true,
    },
    idDeporte: {
        type: DT.INTEGER,
        primaryKey: true,
    }
},
    {
        sequelize: connection,
        modelName: "DeportesXUsuario",
        timestamps: false
    }
)

export default DeportesXUsuario;
