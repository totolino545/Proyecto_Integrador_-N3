const express = require('express');
const router = express.Router();

const { Op } = require('sequelize');
const { Generos, Actricesyactores, Categorias, Vista_Catalogo } = require('../models/index');

// Endpoint a /catalogo lista las tablas Generos, Actricesyactores, Catalogo y
// Categorias ruta http://localhost:8080/catalogo?busqueda='?'
router.get('/', async (req, res, next) => {
    const item = req.query.busqueda;
    const campo = ['generos', 'categorias', 'actricesyactores', 'catalogo'];
    if (!campo.includes(item)) {
        res.status(400).send({ message: `Error: Se requiere un parámetro de búsqueda.` });
        return;
    }
    try {
        let listado;

        switch (item) {
        case 'generos':
            listado = await Generos.findAll();
            break;
        case 'categorias':
            listado = await Categorias.findAll();
            break;
        case 'actricesyactores':
            listado = await Actricesyactores.findAll();
            break;
        case 'catalogo':
            listado = await Vista_Catalogo.findAll();
            break;
        default:
            res.status(400).send({ message: 'Error: Endpoint  no válido.' });
            return;
        }

        res.status(200).send(listado);
    } catch (err) {
        res.status(500);
        next(err);
    }
});

// Endpoint a /catalogo lista por ID, ruta http://localhost:8080/catalogo/1
router.get('/:catalogoid', async (req, res, next) => {
    const ID = req.params.catalogoid;

    if (Number.isNaN(Number(ID))) {
        res.status(400).send({ message: 'El ID tiene que ser un número' });
        return;
    }

    const titulo = await Vista_Catalogo.findByPk(ID);
    if (!titulo) {
        res.status(404);
        next({ message: 'El ID no se encontró' });
        return;
    }

    res.status(200).send(titulo);
});

// Endpoint a /catalogo/nombre busqueda por titulo o porcion del nombre ruta http://localhost:8080/catalogo/nombre/titulo
router.get('/nombre/:nombre', async (req, res, next) => {
    try {
        const titulo = req.params.nombre;
        // Verifica si el parámetro de búsqueda está presente
        if (!titulo) {
            res.status(404);
            next({ message: `Error: Se requiere un parámetro de búsqueda.` });
            return;
        }
        // Realiza la búsqueda utilizando el operador LIKE
        const resultados = await Vista_Catalogo.findAll({
            where: {
                Titulo: {
                    [Op.like]: `%${titulo}%`
                }
            }
        });
        if (resultados.length === 0) {
            res.status(200);
            next({ message: 'El Titulo no se encontró' });
            return;
        }
        res.status(200).send(resultados);
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint a /catalogo/genero busqueda por Genero ruta http://localhost:8080/catalogo/genero/nombre
router.get('/genero/:genero', async (req, res, next) => {
    try {
        const nombre = req.params.genero;
        console.log(nombre);
        // Verifica si el parámetro de búsqueda está presente
        if (!nombre) {
            res.status(404);
            next({ message: `Error: Se requiere un parámetro de búsqueda.` });
            return;
        }
        // Realiza la búsqueda utilizando el operador LIKE
        const resultados = await Vista_Catalogo.findAll({
            where: {
                Genero: {
                    [Op.like]: `%${nombre}%` // `%` es un comodín para buscar cualquier coincidencia
                }
            }
        });
        if (resultados.length === 0) {
            res.status(200);
            next({ message: 'No se han encontrado coincidencias' });
            return;
        }
        res.json(resultados);
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint a /catalogo/genero busqueda por Categoria ruta http://localhost:8080/catalogo/genero/nombre
router.get('/categoria/:categoria', async (req, res, next) => {
    try {
        const nombre = req.params.categoria;
        console.log(nombre);
        // Verifica si el parámetro de búsqueda está presente
        if (!nombre) {
            res.status(404);
            next({ message: `Error: Se requiere un parámetro de búsqueda.` });
            return;
        }
        // Realiza la búsqueda utilizando el operador LIKE
        const resultados = await Vista_Catalogo.findAll({
            where: {
                Categoria: {
                    [Op.like]: `%${nombre}%` // `%` es un comodín para buscar cualquier coincidencia
                }
            }
        });
        if (resultados.length === 0) {
            res.status(200);
            next({ message: 'No se han encontrado coincidencias' });
            return;
        }
        res.json(resultados);
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


module.exports = router;