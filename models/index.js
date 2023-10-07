import Usuario from "./Usuario.js";
import Deporte from "./Deporte.js"
import Categoria from "./Categoria.js"
import infoContacto from "./infoContacto.js";
import Socio from "./socio.js";
import Fecha from "./fecha.js";
import Asistencia from "./Asistencia.js";
import Rol from "./rol.js";
import DeportesXUsuario from "./DeportesXUsuario.js";


// Relacion Rol(1) y Usuario(M)

Rol.hasMany(Usuario, {
    foreignKey: "idRol",
})

Usuario.belongsTo(Rol, {
    foreignKey: "idRol",
})


// Relacion usuarios con deportes (N a N) -> Genera tabla intermedia.

Usuario.belongsToMany(Deporte, {
    through:"DeportesXUsuario",
    foreignKey: "idDeporte"
})

Deporte.belongsToMany(Usuario, {
    through:"DeportesXUsuario",
    foreignKey: "idUsuario"
})


// Relacion Coordinador() y deporte()





export {Usuario,infoContacto, Socio, Fecha, Asistencia, Deporte, Rol, Categoria,DeportesXUsuario};
