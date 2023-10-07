import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class Rol extends Model {

}

Rol.init (
{
    idRol : {
        type: DT.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo: {
        type: DT.CHAR(1),
        allowNull: false,
        validate: {
            isIn: {
                args: [['G','D','P']],
                msg: "El tipo debe ser G, D o P"
            }
        }
    }
},
{
    sequelize: connection,
    modelName: "Rol",
    timestamps:false
  }
)

export default Rol;
