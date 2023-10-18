import { Socio } from "../models/index.js";

const seedSocio = async () => {
    try {

        await Socio.bulkCreate([
            {
                nroSocio: 1,
                nombre: `Juampi`,
                apellido: 'Turner',
                dni: 44444444,
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
                dni: 44444444,
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
                dni: 44444444,
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
                dni: 44444444,
                email: 'tomas@gmail.com',
                telefono: 123123123,
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