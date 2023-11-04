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
      validate: {
        is: {
          args: /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
          msg: 'El nombre solo debe contener letras',
        },
        len: {
          args: [2, 24],
          msg: "El nombre debe tener un minimo de 2 caracteres y un maximo de 24"
        }
      }
    },

    apellido: {
      type: DT.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
          msg: "El apellido solo debe contener letras"
        },
        len: {
          args: [2, 24],
          msg: "El apellido debe tener un minimo de 2 caracteres y un maximo de 24"
        }
      }
    },

    fechaNacimiento: {
			type: DT.DATEONLY,
			allowNull: false,
			validate: {
				isDate: {
					msg: "7Formato de Fecha Invalido"
				},
				isAntesDeHoy: function (value) {
					if (new Date(value) >= new Date()) {
						throw new Error('7La fecha debe ser anterior al día de hoy.');
					}
				},

			}
		},

    dni: {
      type: DT.STRING,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "El DNI solo debe contener numeros"
        },
        len: {
          args: [6, 10],
          msg: "El DNI debe tener un largo minimo de 6 digitos y un maximo de 10"
        }
      }
    },


    email: {
      type: DT.STRING,
      allowNull: false,
      unique: {
        msg: "El Email ingresado ya esta Registrado"
      },
      validate: {
        isEmail: {
          msg: "EL formato del Email es Incorrecto"
        },
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

        isNumeric: {
          msg: "El Telefono solo debe contener numeros"
        },
        len: {
          args: [8, 15],
          msg: "El telefono debe tener un minimo de 8 caracteres y un maximo de 15"
        }
      }
    },

    direccion: {
      type: DT.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 50],
          msg: "La Direccion debe tener un minimo de 5 caracteres y un maximo de 50"
        }
      }
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

Usuario.beforeBulkCreate(async (users) => {

  for (let index = 0; index < users.length; index++) {
    const user = users[index];

    const salt = await bcrypt.genSalt();
    user.salt = salt;

    const claveHash = await bcrypt.hash(user.clave, salt);
    user.clave = claveHash;

  };

});

export default Usuario;
