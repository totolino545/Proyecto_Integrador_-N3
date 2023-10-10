const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection_db');

const Catalogo_Tags = sequelize.define('Catalogo_Tags', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    IdTitulo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Idgen: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Catalogo_Tags',
    timestamps: false
});

module.exports = Catalogo_Tags;