const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { Vista_Catalogo } = require('../models/index');

// Endpoint a /catalogo filtrar por nombre o parte del nombre ruta http://localhost:8080/actortitulo?nombre=''?
router.get('/:actor', async (req, res, next) => {
    const nombre = req.params.actor;
    try {
        if (!nombre) {
            res.status(404);
            next({ message: `Error: Se requiere un parámetro de búsqueda.` });
            return;
        }

        // Realiza la búsqueda utilizando el operador LIKE
        const resultados = await Vista_Catalogo.findAll({
            where: {
                Reparto: {
                    [Op.like]: `%${nombre}%`
                }
            }
        });
        if (resultados.length === 0) {
            res.status(200);
            next({ message: 'El Actor no se encontró' });
            return;
        }

        res.json(resultados);
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;