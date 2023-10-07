//Me voy a conectar a sequelize 
import { Sequelize } from "sequelize";
import 'dotenv/config'
import {database,username,password,host,dialect,port} from "../config/config.js";


const connection = new Sequelize(database, username, password,{
    host,
    dialect,
    port,
});

try {
    await connection.authenticate();
    console.log("Connection a DB ok")
} catch (error){
    console.error("Error en la connecion", error)
}


export default connection
