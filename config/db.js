
const { Sequelize } = require('sequelize');
const {DB_HOST, 
  DB_PORT, 
  DB_DATABASE, 
  DB_USER, DB_PASSWORD}  = require('../config');
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST, port: DB_PORT,
  dialect: 'mysql'
});

// Verificar la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos.');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos: ', error);
  });


  
  // Sincronizar los cambios
sequelize.sync({ force: false }) // Utiliza { force: true } si quieres eliminar y recrear todas las tablas en cada sincronización
    .then(() => {
      console.log('Base de datos sincronizada');
    })
    .catch((error) => {
      console.error('Error al sincronizar la base de datos:', error);
    });



module.exports = {
   sequelize
};
 