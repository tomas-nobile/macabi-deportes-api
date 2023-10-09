import express from "express"

import indexRoutes from "./routes/indexRoutes.js"
import connection from "./connection/connection.js";
import { serverPort } from "./config/config.js"

import seedRol from "./seed/seedRol.js";
import seedUsuario from "./seed/seedUsuario.js";


const app = express(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(indexRoutes);

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({ success: false, message: error.message });
});
//una vez que traigo indexRoutes, voy a empezar a ejecutar midlewares

let force = true

await connection.sync({ force }).then(() => {
    app.listen(serverPort, () => {
        console.log("Server ok: http://localhost:" + serverPort)
    });
}).then(async () => {
    if (force) {
        await seedRol()
        await seedUsuario()
    }
});