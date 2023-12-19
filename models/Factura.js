const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');


const Factura = sequelize.define('Factura', {
    factura_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    user_email:{
        type: DataTypes.STRING,
    },
    total: {
        type: DataTypes.INTEGER.UNSIGNED,
    }
});
 // Asegúrate de que el nombre de la clave foránea sea correcto

module.exports = Factura;