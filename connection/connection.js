import { Sequelize } from "sequelize";
import 'dotenv/config'
import {database,username,password,host,dialect,port,database_url} from "../config/config.js";


const connection = new Sequelize(database_url,{
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
