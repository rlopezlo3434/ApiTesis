// FacturaDetalle.js
const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const Comida = require('./Comida');
const Factura = require('./Factura');

const FacturaDetalle = sequelize.define('FacturaDetalle', {
    detalleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    cantidad: {
        type: DataTypes.INTEGER.UNSIGNED,
    },
    total: {
        type: DataTypes.DECIMAL.UNSIGNED,
    }
});

FacturaDetalle.belongsTo(Factura, { foreignKey: 'factura_id' });
FacturaDetalle.belongsTo(Comida, { foreignKey: 'comidaId' });

module.exports = FacturaDetalle;
