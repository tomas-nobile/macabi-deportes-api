//Me voy a conectar a sequelize 
import { Sequelize } from "sequelize";
import 'dotenv/config'
import {database,username,password,host,dialect,port,database_url} from "../config/config.js";


const connection = new Sequelize("postgres://macabi_asistencias_bd_user:qYNDCYJUyEuqpRN5Lc8oa5kxRtjCXmSv@dpg-ckunivbamefc73bhltd0-a.oregon-postgres.render.com/macabi_asistencias_bd",{
    dialect: 'postgres',
    dialectOptions: {
        ssl: true,
    },
});

try {
    await connection.authenticate();
    console.log("Connection a DB ok")
} catch (error){
    console.error("Error en la connecion", error)
}


export default connection
