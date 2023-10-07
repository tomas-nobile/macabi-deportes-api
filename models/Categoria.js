import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class Categoria extends Model {}

Categoria.init(
    {
    nombre: {
        type: DT.STRING,
        allowNull: false,
      },
      nombreDeporte: {
        type: DT.STRING()
      },
      idProfesor: {
        type: DT.INTEGER()
      }
    },
    {
        sequelize: connection,
        modelName: "Categoria",
        timestamps:false
      }
    );

export default Categoria;
