const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection_db');

const Categorias = sequelize.define('Categorias', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Categorias',
    timestamps: false
});

module.exports = Categorias;