import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class SociosXCategorias extends Model {

}

SociosXCategorias.init({
  idSocio: {
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
    modelName: "SociosXCategoria",
    timestamps: false
  })

export default SociosXCategorias;

