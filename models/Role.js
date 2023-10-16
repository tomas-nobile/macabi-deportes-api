import { DataTypes as DT} from "sequelize";
import connection from "../connection/connection.js"

const Role =connection.define("Rol",{
    rol :{
        type: DT.STRING(),
        allowNull:false,
    },
});

export default Role;