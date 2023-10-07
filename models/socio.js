import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";
import bcrypt from "bcrypt";

class Socio extends Model {
    async validaClave(password){
      return await bcrypt.compare(password, this.clave);
    }
  }

Socio.init (
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
            unique: true,
            validate: {
              isEmail: true,
            },
          },
           salt: {
            type: DT.STRING()
          },
          telefono: {
            type: DT.STRING,
            allowNull: false,
            validate: {
              len: [3,30]
            }
          },
          direccion: {
            type: DT.STRING,
            allowNull: false,
          },
          observaciones: {
            type: DT.STRING,
            allowNull: false,
          }
    },
    {
        sequelize: connection,
        modelName: "Socio",
        timestamps:false
      }
    )

    Socio.beforeCreate(async(socio)=>{
        const salt = await bcrypt.genSalt();
        socio.salt = salt;
        const passwordHash = await bcrypt.hash(socio.clave, salt);
        socio.clave = passwordHash;
      })

      export default Socio;