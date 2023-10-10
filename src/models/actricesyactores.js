const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection_db');

const Actricesyactores = sequelize.define('Actricesyactores', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Actor: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Actricesyactores',
    timestamps: false
});

module.exports = Actricesyactores;