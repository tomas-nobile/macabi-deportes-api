import InfoUsuario from "./InfoUsuario.js";
import Deporte from "./Deporte.js"
import Categoria from "./Categoria.js"
import infoContacto from "./infoContacto.js";
import Socio from "./socio.js";
import Coordinador from "./coordinador.js";
import Fecha from "./fecha.js";
import Asistencia from "./Asistencia.js";
import Profesor from "./Profesor.js"
import Rol from "./rol.js";


// Relacion Rol(1) y InfoUsuario(M)

Rol.hasMany(InfoUsuario,{
    foreignKey: "idRol",
})
InfoUsuario.belongsTo(Rol,{
    foreignKey: "idRol",
})

// Relacion Coordinador(1) y infoContacto(1)



// Relacion Coordinador() y deporte()





export {InfoUsuario,infoContacto, Socio ,Coordinador, Fecha, Asistencia, Deporte, Rol, Categoria, Profesor};
