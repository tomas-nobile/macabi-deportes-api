import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class Categoria extends Model { }

Categoria.init(
  {

    idCategoria: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nombreCategoria: {
      type: DT.STRING,
      allowNull: false,
      unique: {
        msg: "Error. Esta categoria ya existe"
      },
    },

    idDeporte: {
      type: DT.INTEGER,
      foreingKey: true,
      allowNull:false,

    },

    idUsuario: {
      type: DT.INTEGER(),
      foreingKey: true,
      allowNull:true,
    }
  },
  {
    sequelize: connection,
    modelName: "Categoria",
    timestamps: false
  }
);

export default Categoria;
