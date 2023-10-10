const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection_db');

const Vista_Catalogo = sequelize.define('Vista_Catalogo', {
    IdCatalogo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    poster: {
        type: DataTypes.STRING
    },
    titulo: {
        type: DataTypes.STRING
    },
      
    categoria: {
        type: DataTypes.STRING
    },
    Genero: {
        type: DataTypes.STRING
    },
    resumen: {
        type: DataTypes.TEXT
    }, 
    temporadas: {
        type: DataTypes.STRING
    },
    Reparto: {
        type: DataTypes.STRING
    },
    trailer: {
        type: DataTypes.STRING
    }       
}, {
    tableName: 'Vista_Catalogo',
    timestamps: false
});

module.exports = Vista_Catalogo;