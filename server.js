import express from "express"
const app = express()
import indexRoutes from "./routes/indexRoutes.js"
import connection from "./connection/connection.js";
// import roleSeed from "./seed/roleSeed.js";
import {serverPort} from "./config/config.js"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(indexRoutes);

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({ success: false, message: error.message });
  });
//una vez que traigo indexRoutes, voy a empezar a ejecutar midlewares

await connection.sync({force:true}).then(() => {
    app.listen(serverPort, ()=>{
        console.log("Server ok: http://localhost:" + serverPort)
    });
})//.then(roleSeed)