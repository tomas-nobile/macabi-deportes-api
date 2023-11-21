import { Usuario } from "../models/index.js";

const seedUsuario = async () => {
    try {

        await Usuario.bulkCreate([
            {
                nombre: `marcos`,
                apellido: `dias`,
                fechaNacimiento: '2005-12-12',
                dni: 42123322,
                email: 'testmacabi1@yopmail.com',
                clave: 'hola',
                direccion: 'av falsa 123',
                telefono:"1234567891",
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
                telefono:"1234567891",
                activo: true,
                idRol: 2
            },
            {
                nombre: `carlos`,
                apellido: `messi`,
                fechaNacimiento: '1995-12-12',
                dni: 42123323,
                email: 'messirve@gmail.com',
                clave: 'hola3',
                direccion: 'av falsa 123',
                telefono:"1234567891",
                activo: true,
                idRol: 2
            },
            {
                nombre: `damian`,
                apellido: `rodriguez`,
                fechaNacimiento: '2002-12-12',
                dni: 42123325,
                email: 'damian@gmail.com',
                clave: 'hola4',
                direccion: 'av falsa 123',
                telefono:"1234567891",
                activo: true,
                idRol: 3
            },
            {
                nombre: `matias`,
                apellido: `franco`,
                fechaNacimiento: '2002-12-12',
                dni: 42123326,
                email: 'matias.f@gmail.com',
                clave: 'hola5',
                direccion: 'av falsa 1235',
                telefono:"1234567891",
                activo: true,
                idRol: 3
            },
            {
                nombre: `Mumbuto`,
                apellido: `Uwimana`,
                fechaNacimiento: '1995-12-12',
                dni: 42123323,
                email: 'osas@gmail.com',
                clave: 'hola6',
                direccion: 'av falsa 123',
                telefono:"1234567891",
                activo: true,
                idRol: 2
            },
            {
                nombre: `Mumbuto`,
                apellido: `Uwimana`,
                fechaNacimiento: '1995-12-12',
                dni: 42123323,
                email: 'testmacabi6@yopmail.com',
                clave: 'hola6',
                direccion: 'av falsa 123',
                telefono:"1234567891",
                activo: true,
                idRol: 3
            },

        ]);
    } catch (error) {
        console.log(error.message);
    }
};

export default seedUsuario;