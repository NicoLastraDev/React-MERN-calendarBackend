const express = require('express');
const dotenv = require('dotenv').config();
const {connectDB} = require('./database/config');
const cors = require('cors')
const path = require('path')

const PORT = process.env.PORT || 4000;

//crear servidor express
const app = express();

//base de datos
connectDB();

//CORS
app.use(cors())
//Lectura y parseo del body
app.use(express.json());

//rutas
//TODO: auth // crear, login renew
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//ruta publica
app.use(express.static('public'));

app.use('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//configurar el puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
