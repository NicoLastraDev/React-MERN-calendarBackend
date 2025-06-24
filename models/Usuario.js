const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    img: {
        type: String
    },
    google: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Usuario', UsuarioSchema);