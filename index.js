//require('dotenv').config();
const express = require('express');
const config = require('./config/global');
const cors = require('cors');
const path = require('path');
const firebase = require('firebase/app');
const firebaseConfig = require('./config/firebase')
const {PORT}  = require('./config');
firebase.initializeApp(firebaseConfig);
const app = express();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/comidas', require('./routes/comida'));
app.use('/api/photos', require('./routes/photo'));
app.use('/api/categoria',require('./routes/categoria'));
app.use('/api/factura', require('./routes/factura'));
app.use('/login', require('./routes/login'));

app.use('/uploads', express.static(path.resolve('uploads')));

app.listen(PORT, ()=>{
    console.log('La API esta corriendo en el puerto 4000')
})
