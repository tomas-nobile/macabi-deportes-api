import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class Socio extends Model {}

Socio.init(
  {
    nroSocio: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nombre: {
      type: DT.STRING,
      allowNull: false,
    },

    apellido: {
      type: DT.STRING,
      allowNull: false,
    },

    dni: {
      type: DT.STRING,
      allowNull: false,
      validate: {
        len: [7, 9]
      }
    },

    email: {
      type: DT.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    telefono: {
      type: DT.STRING,
      allowNull: true,
      validate: {
        len: [3, 30]
      }
    },

    direccion: {
      type: DT.STRING,
      allowNull: false,
    },

    fechaNacimiento: {
      type: DT.DATEONLY,
      allowNull: false,
    },

    observaciones: {
      type: DT.STRING,
      allowNull: true,
    }
  },
  {
    sequelize: connection,
    modelName: "Socio",
    timestamps: false
  }
)


export default Socio;