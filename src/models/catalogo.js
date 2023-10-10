const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection_db');

const Catalogo = sequelize.define('Catalogo', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    resumen: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    temporadas: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    trailer: {
        type: DataTypes.STRING
    },
    poster: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Catalogo',
    timestamps: false
});

module.exports = Catalogo;