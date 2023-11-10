import Usuario from "./Usuario.js";
import Deporte from "./Deporte.js"
import Categoria from "./Categoria.js"
import infoContacto from "./infoContacto.js";
import Socio from "./socio.js";
import Fecha from "./Fecha.js";
import Asistencia from "./Asistencia.js";
import Rol from "./rol.js";
import DeportesXUsuario from "./DeportesXUsuario.js";
import SociosXCategorias from "./SociosXCategorias.js";
import ContactoEmergencia from "./ContactoEmergencia.js";
import CategoriasXUsuario from "./CategoriasXUsuario.js";



// Relacion Rol(1) y Usuario(M)

Rol.hasMany(Usuario, {
    foreignKey: "idRol",
})

Usuario.belongsTo(Rol, {
    foreignKey: "idRol",
})


// Relacion usuarios con deportes (N a N) -> Genera tabla intermedia.

Usuario.belongsToMany(Deporte, {
    as: 'DeportesAsignados',
    through: "DeportesXUsuario", 
    foreignKey: "idUsuario",
     })

Deporte.belongsToMany(Usuario, {
    as: 'CoordinadoresAsignados',
    through: "DeportesXUsuario",
    foreignKey: "idDeporte", 
    onDelete: 'CASCADE'})

    // Relacion usuarios con categorias (N a N) -> Genera tabla intermedia. ->Versión nueva
Usuario.belongsToMany(Categoria, {
    as: 'CategoriasAsignadas',
    through: "CategoriasXUsuario", 
    foreignKey: "idUsuario"})

Categoria.belongsToMany(Usuario, {
    as: 'ProfesoresAsignados',
    through: "CategoriasXUsuario",
    foreignKey: "idCategoria", 
    onDelete: 'CASCADE',
})
    
    

// Relacion deporte (N categorias) y categoria (1 deporte)


Deporte.hasMany(Categoria, {
    foreignKey:  "idDeporte",
    onDelete: 'CASCADE'
})

Categoria.belongsTo(Deporte, {
    foreignKey: "idDeporte",
})

/* -> Versión vieja
// Relacion usuario (N categorias) y categoria (1 usuario)


Usuario.hasMany(Categoria, {
    foreignKey: {name:"idUsuario", allowNull:true},
    
})

Categoria.belongsTo(Usuario, {
    foreignKey: {name:"idUsuario", allowNull:true},
})
*/
// Relacion categoria (N fechas) y fecha (1 categoria)


Categoria.hasMany(Fecha, {
    foreignKey: "idCategoria",
    onDelete: 'CASCADE',
})

Fecha.belongsTo(Categoria, {
    foreignKey: "idCategoria",
})


// Relacion socio (N infoSocio) y infoContacto (1 Socio)


Socio.hasMany(infoContacto, {
    foreignKey: "idSocio",
})

infoContacto.belongsTo(Socio, {
    foreignKey: "idSocio",
})

// Relacion socios con categorias (N a N) -> Genera tabla intermedia.

Socio.belongsToMany(Categoria, {
    through: "SociosXCategoria",
    foreignKey: "idSocio"
})

Categoria.belongsToMany(Socio, {
    through: "SociosXCategoria",
    foreignKey: "idCategoria",
    onDelete: 'CASCADE'
})

// Relacion socios con fechas (N a N) -> Genera tabla intermedia.

Socio.belongsToMany(Fecha, {
    through: "Asistencia",
    onDelete: 'CASCADE', //Si elimina socio, elimina todas sus fechas asocioadas ()
    foreignKey: "idSocio"
})

Fecha.belongsToMany(Socio, {
    through: "Asistencia",
    onDelete: 'CASCADE',
    foreignKey: "idFecha"
})





export { Usuario, infoContacto, Socio, Fecha, Asistencia, Deporte, Rol, Categoria, DeportesXUsuario, SociosXCategorias, ContactoEmergencia, CategoriasXUsuario };