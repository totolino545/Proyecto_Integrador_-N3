const express = require('express');
const router = express.Router();

const fs = require('fs');
// let ruta = path.join(__dirname, '../json/catalogo_reparto.json');
const {Generos, Catalogo_Reparto, Categorias, Catalogo_Tags, Actricesyactores, Catalogo} = require('../models/index');

function leer(ARCHIVO) {
    const ruta = `src/json/${ARCHIVO}.json`;
    return new Promise((resolve, reject) => {
        fs.readFile(ruta, 'utf8', (error, result) => {
            if (error) {
                reject(new Error(`Error: No se puede leer el archivo ${ARCHIVO}`));
            } else {
                resolve(JSON.parse(result));
            }
        });
    });
}
// Endpoint a /writejson lista toda la tablas ruta http://localhost:8080/writejson?listado='?'
router.post('/', async (req, res) => {
    const ARCHIVO = req.query.cargar;
    const campo = ['generos', 'catalogo_reparto', 'categorias', 'catalogo_tags', 'actricesyactores', 'catalogo'];
    if (!campo.includes(ARCHIVO)) {
        res.status(400).send({ message: `Error: El paramaetro debe ser ${campo} ${ARCHIVO}` });
        return;
    }
    try {
        const titulos = await leer(ARCHIVO);
        console.log(titulos);
        let newCategoria;

        switch (ARCHIVO) {
        case 'generos':
            newCategoria = await Generos.bulkCreate(titulos);
            break;
        case 'catalogo_reparto':
            newCategoria = await Catalogo_Reparto.bulkCreate(titulos);
            break;
        case 'categorias':
            newCategoria = await Categorias.bulkCreate(titulos);
            break;
        case 'catalogo_tags':
            newCategoria = await Catalogo_Tags.bulkCreate(titulos);
            break;
        case 'catalogo':
            titulos.sort((a, b) => a.id - b.id);
            newCategoria = await Catalogo.bulkCreate(titulos);
            break;
        case 'actricesyactores':
            newCategoria = await Actricesyactores.bulkCreate(titulos);
            break;
        default:
            res.status(400).send({ message: `Error: El paramaetro debe ser (${campo}) Ud. ingreso ${ARCHIVO}` });
            return;
        }
        res.status(201).send(newCategoria);
        console.log(`Tabla ${ARCHIVO} actualizada`);
    } catch (error) {
        console.log(`Error al procesar el archivo ${ARCHIVO}.json: ${error.message}`);
        res.status(500).send('Hubo un error en el servidor');
    } finally {
        // await desconnect();
    }
});

module.exports = router;