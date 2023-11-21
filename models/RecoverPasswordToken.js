import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";
import bcrypt from "bcrypt";

class RecoverPasswordToken extends Model {
}

RecoverPasswordToken.init(
  {
    idCode: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    idUsuario: {
      type: DT.INTEGER,
      allowNull:false,
    },

    email: {
      type: DT.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "EL formato del Email es Incorrecto"
        },
      },
    },

    token:{
      type: DT.STRING,
      allowNull:false,
    },

    isUsed:{
      type: DT.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }

  },
  {
    sequelize: connection,
    modelName: "RecoverPasswordToken",
    timestamps: true
  }
);


export default RecoverPasswordToken;
