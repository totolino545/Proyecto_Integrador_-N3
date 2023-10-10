const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection_db');

const Vista_Generos = sequelize.define('Vista_Generos', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Vista_Generos',
    timestamps: false
});

module.exports = Vista_Generos;