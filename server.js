import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

import indexRoutes from "./routes/indexRoutes.js"
import connection from "./connection/connection.js";
import { serverPort } from "./config/config.js"

import seedRol from "./seed/seedRol.js";
import seedUsuario from "./seed/seedUsuario.js";
import seedSocio from './seed/seedSocio.js';
import seedDeporte from './seed/seedDeporte.js'
import seedDeportesXUsuario from './seed/seedDeportesXUsuario.js'
import seedCategoria from './seed/seedCategorias.js';
import seedSocioXCategorias from './seed/seedSocioXCategorias.js';
import seedFecha from './seed/seedFecha.js';
import seedAsistencia from './seed/seedAsistencia.js';


const app = express();

const corsOptions = { credentials: true, origin: 'http://localhost:5173' }

//middleweres
app.use(cors(corsOptions))

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//rutas
app.use(indexRoutes);


// Error Handler
app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .send({ success: false, message: error.message });
});


let force = false

connection.sync({ force })
  .then(() => {
    app.listen(serverPort, () => {
      //console.clear()
      console.log("server OK http://localhost:" + serverPort);
    })
  })
  .then(async () => {
    if (force) {
      await seedRol()
      await seedUsuario()
      await seedSocio()
      await seedDeporte()
      await seedDeportesXUsuario()  
      await seedCategoria()
      await seedSocioXCategorias()
      await seedFecha()
      await seedAsistencia()
    }
  });

