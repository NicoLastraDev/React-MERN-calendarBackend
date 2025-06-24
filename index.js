const express = require('express');
const dotenv = require('dotenv').config();
const {connectDB} = require('./database/config');
const cors = require('cors')

const PORT = process.env.PORT;

//crear servidor express
const app = express();

//base de datos
connectDB();

//CORS
app.use(cors())

//ruta publica
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//rutas
//TODO: auth // crear, login renew
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


//configurar el puerto

PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});