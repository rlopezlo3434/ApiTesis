const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Categoria = sequelize.define('Categoria',{
    id_categoria:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Categoria;

// Importar y configurar las asociaciones después de la definición del modelo
const Comida  = require('./Comida');

Categoria.hasMany(Comida, { foreignKey: 'id_categoria' });
