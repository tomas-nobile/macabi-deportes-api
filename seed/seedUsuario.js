import { Usuario } from "../models/index.js";

const seedUsuario = async () => {
    try {

        await Usuario.bulkCreate([
            {
                nombre: `marcos`,
                apellido: `dias`,
                fechaNacimiento: '2012-12-12',
                dni: 42123321,
                email: 'marcos@gmail.com',
                clave: 'hola',
                direccion: 'av falsa 123',
                telefono:"12 3456 7891",
                activo: true,
                idRol: 1
            },
            {
                nombre: `martina`,
                apellido: `perez`,
                fechaNacimiento: '2005-12-12',
                dni: 42123321,
                email: 'martina@gmail.com',
                clave: 'hola2',
                direccion: 'av falsa 123',
                telefono:"12 3456 7891",
                activo: true,
                idRol: 2
            },
            {
                nombre: `damian`,
                apellido: `rodriguez`,
                fechaNacimiento: '2002-12-12',
                dni: 42123321,
                email: 'damian@gmail.com',
                clave: 'hola3',
                direccion: 'av falsa 123',
                telefono:"12 3456 7891",
                activo: true,
                idRol: 3
            },

        ]);
    } catch (error) {
        console.log(error.message);
    }
};

export default seedUsuario;