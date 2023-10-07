import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";


class infoContacto extends Model {

}

infoContacto.init (
{
    id : {
        type: DT.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idSocio: {
        type: DT.INTEGER,
        allowNull:false
    },
    nombre: {
        type: DT.STRING,
        allowNull:false
    },
    apellido: {
        type: DT.STRING,
        allowNull:false
    },
    mail: {
        type: DT.STRING,
        allowNull:false,
        unique:true,
        validate: {
            isEmail:true
        }
    },
    telefono: {
        type: DT.STRING,
        allowNull: false,
        validate: {
          len: [9,30] // 
        }
      },

},
{
    sequelize: connection,
    modelName: "InfoContacto",
    timestamps:false
  }
)

export default infoContacto;

