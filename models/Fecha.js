import { DataTypes as DT } from "sequelize";
import connection from "../connection/connection.js";


const Fecha = connection.define("Fecha", {

    idFecha: {
        type: DT.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    fechaCalendario: {
        type: DT.DATE,
        allowNull: false,
    },

    tipo: {
        type: DT.CHAR,
        allowNull: false,
        validate: {
            isIn: {
                args: [['E', 'C']],
                msg: "El tipo debe ser E o C"
            }
        }
    },


}, {
    timestamps: false
});

export default Fecha;