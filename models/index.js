import Usuario from "./Usuario.js";
import Deporte from "./Deporte.js"
import Categoria from "./Categoria.js"
import infoContacto from "./infoContacto.js";
import Socio from "./socio.js";
import Fecha from "./fecha.js";
import Asistencia from "./Asistencia.js";
import Rol from "./rol.js";
import DeportesXUsuario from "./DeportesXUsuario.js";
import SociosXCategorias from "./SociosXCategorias.js";



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
    foreignKey: "idUsuario"
})

Deporte.belongsToMany(Usuario, {
    through:"DeportesXUsuario",
    foreignKey: "idDeporte"
})


// Relacion deporte (N categorias) y categoria (1 deporte)


Deporte.hasMany(Categoria, {
    foreignKey: "idDeporte",
})

Categoria.belongsTo(Deporte, {
    foreignKey: "idDeporte",
})

// Relacion usuario (N categorias) y categoria (1 usuario)


Usuario.hasMany(Categoria, {
    foreignKey: "idUsuario",
})

Categoria.belongsTo(Usuario, {
    foreignKey: "idUsuario",
})

// Relacion categoria (N fechas) y fecha (1 categoria)


Categoria.hasMany(Fecha, {
    foreignKey: "idCategoria",
})

Fecha.belongsTo(Categoria, {
    foreignKey: "idCategoria",
})


// Relacion socio (N infoSocio) y infoContacto (1 Socio)


Socio.hasMany(infoContacto, {
    foreignKey: "nroSocio",
})

infoContacto.belongsTo(Socio, {
    foreignKey: "nroSocio",
})

// Relacion socios con categorias (N a N) -> Genera tabla intermedia.

Socio.belongsToMany(Categoria, {
    through:"SociosXCategoria",
    foreignKey: "nroSocio"
})

Categoria.belongsToMany(Socio, {
    through:"SociosXCategoria",
    foreignKey: "idCategoria"
})




export {Usuario,infoContacto, Socio, Fecha, Asistencia, Deporte, Rol, Categoria,DeportesXUsuario,SociosXCategorias};
