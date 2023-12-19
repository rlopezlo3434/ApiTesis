const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


const Comida = sequelize.define('Comida', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  id_categoria: {
    type: DataTypes.INTEGER.UNSIGNED
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Comida;

// Establece la relación muchos a muchos con Pago a través de PagoComida
// const Pago = require('./Pagos');
// Comida.belongsToMany(Pago, { through: 'PagoComida'});

const Categoria = require('./Categoria');
Comida.belongsTo(Categoria, { foreignKey: 'id_categoria' });

