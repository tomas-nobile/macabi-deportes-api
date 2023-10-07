import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class Deporte extends Model {}

Deporte.init(
    {
    nombre: {
        type: DT.STRING,
        allowNull: false,
      },
      idCoordinador: {
        type: DT.INTEGER()
      }
    },
    {
        sequelize: connection,
        modelName: "Deporte",
        timestamps:false
      }
    );

export default Deporte;
