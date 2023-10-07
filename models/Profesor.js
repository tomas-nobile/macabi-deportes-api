import { DataTypes as DT } from "sequelize";
import connection from "../connection/connection.js";

const Profesor = connection.define("Profesor", {

    idProfesor: {
        type: DT.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    idUsuario: {
        type: DT.INTEGER,
        foreignKey: true,
        allowNull: false,
    },

}, {
    timestamps: false
});

export default Profesor;