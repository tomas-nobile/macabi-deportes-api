import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";
import bcrypt from "bcrypt";

class InfoUsuario extends Model {
  async validaClave(password){
    return await bcrypt.compare(password, this.clave);
  }
}

InfoUsuario.init(
  {
    nombre: {
      type: DT.STRING,
      allowNull: false,
    },
    apellido: {
      type: DT.STRING,
      allowNull: false,
    },
    fechaNacimiento: {
      type: DT.STRING,
      allowNull: false,
      validate: {
        len: [3,30]
      }
    },
    dni: {
      type: DT.STRING(10),
      allowNull: false,
    },
    clave: {
      type: DT.STRING,
      allowNull: false,
    },
    salt: {
      type: DT.STRING()
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
      allowNull: false,
      validate: {
        len: [3,30]
      }
    },
    activo: {
      type: DT.BOOLEAN,
      allowNull: false,
      validate: {
        len: [3,30]
      }
    },
    roleId: {
      type: DT.INTEGER(),
      // defaultValue: 2,
    }
  },
  {
    sequelize: connection,
    modelName: "InfoUsuario",
    timestamps:false
  }
);

InfoUsuario.beforeCreate(async(user)=>{
  const salt = await bcrypt.genSalt();
  user.salt = salt;
  const passwordHash = await bcrypt.hash(user.clave, salt);
  user.clave = passwordHash;
})

export default InfoUsuario;
