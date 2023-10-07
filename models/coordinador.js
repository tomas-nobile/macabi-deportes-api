import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class Coordinador extends Model {
    
}

Coordinador.init (
    {
        id: {
            type:DT.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        dni: {
            type: DT.STRING,
            allowNull: false,
            validate: {
                len: [7,8]
              }
           
    },
        idDeporte: {
            type: DT.INTEGER, //¿Cómo lo cambiamos?
            allowNull: false,
          },
          idInfoSocio: {
            type: DT.INTEGER, //¿Cómo lo cambiamos? -> Falta la relación
            allowNull: false,
          },

    },
    {
        sequelize: connection,
        modelName: "Coordinador",
        timestamps:false
      }
)

export default Coordinador;