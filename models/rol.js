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
                args: [['A','C','P']],
                msg: "El tipo debe ser A, C o P"
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
