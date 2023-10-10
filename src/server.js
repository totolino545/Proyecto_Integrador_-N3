const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

const sequelize = require('./connection/connection_db');
const catalogo = require('./routes/catalogo');
const writejson = require('./routes/writejson');
const actor = require('./routes/actor');

const server = express();

// Middlewares
server.use(express.json());


const messageErrorServer = JSON.stringify({ message: 'Se ha generado un error en el servidor' });

// Rutas a Catalogos
server.use('/catalogo', catalogo);

// Rutas a Writejson
server.use('/writejson', writejson);

// Rutas a titulo
server.use('/actor', actor);

// Control de rutas inexistentes
server.use('*', (req, res) => {
    res.status(404).send(`<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>`);
});

// Manejo de errores
server.use((err, req, res, next) => {
    console.log(err);
    res.send(err);
});

// Método oyente de solicitudes
sequelize.authenticate().then(() => {
    sequelize.sync({ force: false }).then(() => {
        server.listen(process.env.PORT, process.env.HOST, () => {
            console.log(`El servidor está escuchando en: http://${process.env.HOST}:${process.env.PORT}`);
        });
    }).catch(() => {
        console.log('Hubo un problema con la sincronización con la base de datos.');
    });
}).catch(() => {
    console.log('Hubo un problema con la conección a la base de datos.');
});
