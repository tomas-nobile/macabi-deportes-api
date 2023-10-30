import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class Socio extends Model { }

Socio.init(
	{
		idSocio: {
			type: DT.INTEGER,
			primaryKey: true,
			autoIncrement: true,

		},
		nroSocio: {
			type: DT.INTEGER,
			allowNull: false,
			unique: {
				msg: "0El numero de socio ingresado ya esta Registrado"
			},
			validate: {
				isInt: {
					msg: "0El numero de socio debe ser un numero entero"
				}
			}
		},

		nombre: {
			type: DT.STRING,
			allowNull: false,
			validate: {
				is: {
					args: /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
					msg: '1El nombre solo debe contener letras',
				},
				len: {
					args: [2, 24],
					msg: "1El nombre debe tener un minimo de 2 caracteres y un maximo de 24"
				}
			}
		},

		apellido: {
			type: DT.STRING,
			allowNull: false,
			validate: {
				is: {
					args: /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
					msg: "2El apellido solo debe contener letras"
				},
				len: {
					args: [2, 24],
					msg: "2El apellido debe tener un minimo de 2 caracteres y un maximo de 24"
				}
			}
		},

		dni: {
			type: DT.STRING,
			allowNull: false,
			unique: {
				msg: "3El numero de dni ingresado ya esta Registrado"
			},
			validate: {
				isNumeric: {
					msg: "3El DNI solo debe contener numeros"
				},
				len: {
					args: [6, 10],
					msg: "3El DNI debe tener un largo minimo de 6 digitos y un maximo de 10"
				}
			}
		},

		email: {
			type: DT.STRING,
			allowNull: false,
			unique: {
				msg: "4El Email ingresado ya esta Registrado"
			},
			validate: {
				isEmail: {
					msg: "4EL formato del Email es Incorrecto"
				},
			},
		},

		telefono: {
			type: DT.STRING,
			allowNull: false,
			validate: {

				isNumeric: {
					msg: "5El Telefono solo debe contener numeros"
				},
				len: {
					args: [8, 15],
					msg: "5El telefono debe tener un minimo de 8 caracteres y un maximo de 15"
				}
			}
		},

		direccion: {
			type: DT.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [5, 50],
					msg: "6La Direccion debe tener un minimo de 5 caracteres y un maximo de 50"
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