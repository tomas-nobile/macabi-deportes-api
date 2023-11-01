import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class ContactoEmergencia extends Model {}

ContactoEmergencia.init(
  {
    idContactoEmergencia: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nombre: {
      type: DT.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 50],
          msg: "El nombre debe tener un minimo de 2 caracteres y un maximo de 50",
        },
      },
    },

    email: {
      type: DT.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },

    telefono: {
      type: DT.STRING,
      allowNull: true,
    },

    observaciones: {
      type: DT.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
    modelName: "ContactoEmergencia",
    timestamps: false,
  }
);

export default ContactoEmergencia;
