import { DataTypes as DT } from "sequelize";
import connection from "../connection/connection.js";


const Asistencia = connection.define("Asistencia", {

    idFecha: {
        type: DT.INTEGER,
        primaryKey: true,
    },

    idSocio: {
        type: DT.INTEGER,
        primaryKey: true,
    },

    estado: {
        type: DT.CHAR,
        allowNull: false,
        validate: {
            isIn: {
                args: [['P','A','J']],
                msg: "El tipo debe ser P, A o J"
            }
        }
    },


}, {
    timestamps: false
});

export default Asistencia;