import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";
import bcrypt from "bcrypt";

class Usuario extends Model {
  async validaClave(password) {
    return await bcrypt.compare(password, this.clave);
  }
}

Usuario.init(
  {
    idUsuario: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nombre: {
      type: DT.STRING,
      allowNull: false,
          },

    apellido: {
      type: DT.STRING,
      allowNull: false,
    },

    fechaNacimiento: {
      type: DT.DATEONLY,
      allowNull: false,
      validate: {}
    },
    dni: {
      type: DT.STRING(10),
      allowNull: false,
    },
    email: {
      type: DT.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    clave: {
      type: DT.STRING,
      allowNull: false,
    },
    salt: {
      type: DT.STRING()
    },
    telefono: {
      type: DT.STRING,
      allowNull: false,
      validate: {
        len: [3, 30]
      }
    },
    domicilio: {
      type: DT.STRING,
      allowNull: true,
      validate: {}
    },
    activo: {
      type: DT.BOOLEAN,
      allowNull: false,
    },
    idRol: {
      type: DT.INTEGER(),
      foreignKey: true,
      allowNull: false,
    }
  },
  {
    sequelize: connection,
    modelName: "Usuario",
    timestamps: false
  }
);

Usuario.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt();
  user.salt = salt;
  const passwordHash = await bcrypt.hash(user.clave, salt);
  user.clave = passwordHash;
})

export default Usuario;
