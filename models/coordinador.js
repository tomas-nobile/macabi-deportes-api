import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class Coordinador extends Model {

}

Coordinador.init(
  {
    idCoordinador: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    idUsuario: {
      type: DT.INTEGER,
      foreignKey: true,
      allowNull: false,
    },

    idDeporte: {
      type: DT.INTEGER, //¿Cómo lo cambiamos?
      foreignKey: true,
      allowNull: false,
    },

    idInfoSocio: {
      type: DT.INTEGER, //¿Cómo lo cambiamos? -> Falta la relación 
      allowNull: false, // igna: no se que es jeje
    },

  },
  {
    sequelize: connection,
    modelName: "Coordinador",
    timestamps: false
  }
)

export default Coordinador;