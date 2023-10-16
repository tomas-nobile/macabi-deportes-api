import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class Deporte extends Model { }

Deporte.init(
  {

    idDeporte: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nombre: {
      type: DT.STRING,
      allowNull: false,
      unique: {
        msg: "Error. Este deporte ya existe"
      },
    },
   

  },
  {
    sequelize: connection,
    modelName: "Deporte", 
    timestamps: false
  }
);

export default Deporte;
