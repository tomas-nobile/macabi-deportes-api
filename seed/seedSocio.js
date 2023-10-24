import { Socio } from "../models/index.js";

const seedSocio = async () => {
    try {

        await Socio.bulkCreate([
            {
                nroSocio: 1,
                nombre: `Juampi`,
                apellido: 'Turner',
                dni: 44444441,
                email: 'juampi@gmail.com',
                telefono: 123123123,
                direccion: 'av falsa 123',
                fechaNacimiento: '2005-12-12',
                observaciones: "Primer Usuario Generado Automaticamente",
            },
            {
                nroSocio: 2,
                nombre: `Gino`,
                apellido: 'Basile',
                dni: 44444442,
                email: 'gino@gmail.com',
                telefono: 123123123,
                direccion: 'av falsa 123',
                fechaNacimiento: '2005-12-12',
                observaciones: "Primer Usuario Generado Automaticamente",
            },
            {
                nroSocio: 3,
                nombre: `ignacio`,
                apellido: 'varela',
                dni: 44444443,
                email: 'ignacio@gmail.com',
                telefono: 123123123,
                direccion: 'av falsa 123',
                fechaNacimiento: '2005-12-12',
                observaciones: "Primer Usuario Generado Automaticamente",
            },
            {
                nroSocio: 4,
                nombre: `matias`,
                apellido: 'altmann',
                dni: 44444444,
                email: 'matias@gmail.com',
                telefono: 123123123,
                direccion: 'av falsa 123',
                fechaNacimiento: '2005-12-12',
                observaciones: "Primer Usuario Generado Automaticamente",
            },
            {
                nroSocio: 5,
                nombre: `Tomas`,
                apellido: 'Nobile',
                dni: 44444445,
                email: 'tomas@gmail.com',
                telefono: 123123123,
                direccion: 'av falsa 123',
                fechaNacimiento: '2005-12-12',
                observaciones: "Primer Usuario Generado Automaticamente",
            },
            {
                nroSocio: 6,
                nombre: `agustina`,
                apellido: 'papasidero',
                dni: 41001002,
                email: 'agustina@gmail.com',
                telefono: 123183122,
                direccion: 'av falsa 123',
                fechaNacimiento: '2005-12-12',
                observaciones: "Primer Usuario Generado Automaticamente",
            },
            {
                nroSocio: 7,
                nombre: `Luciana`,
                apellido: 'Rodriguez',
                dni: 41006002,
                email: 'Luciana@gmail.com',
                telefono: 123163121,
                direccion: 'av falsa 123',
                fechaNacimiento: '2005-12-12',
                observaciones: "Primer Usuario Generado Automaticamente",
            },

        ]);
    } catch (error) {
        console.log(error.message);
    }
};

export default seedSocio;