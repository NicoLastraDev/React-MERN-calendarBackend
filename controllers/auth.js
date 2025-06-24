const express = require('express');
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')


const crearUsuario = async(req, res = express.response) => {
    const {name, email, password } = req.body;

    const passwordStr = String(password)

    let usuario = await Usuario.findOne({email});
    try{
      if (usuario) {
        return res.status(400).json({ ok: false, message: 'El usuario ya existe' });
      }
    }
    catch(error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ ok: false, message: 'Error creating user' });
    }

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync()
    const hashedPassword = bcrypt.hashSync(passwordStr, salt);

    const nuevoUsuario = new Usuario({
    name,
    email,
    password: hashedPassword,
  });

    await nuevoUsuario.save();
    //generar token JWT
    const token = await generarJWT(nuevoUsuario._id, nuevoUsuario.name)

    res.status(201).json({ 
      ok: true,
      message: 'usuario creado successful',
      uid: nuevoUsuario._id,
      email: nuevoUsuario.email,
      token: token,
    })
}

const loginUsuario = async (req, res = express.response) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario por email
    const usuario = await Usuario.findOne({ email });

    // Validar si el usuario existe
    if (!usuario) {
      return res.status(400).json({ ok: false, message: 'El usuario no existe' });
    }

    // Validar contraseña
    const validPassword = bcrypt.compareSync(String(password), usuario.password);

    if (!validPassword) {
      return res.status(400).json({ ok: false, message: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    const token = await generarJWT(usuario._id, usuario.name);

    // Autenticación exitosa
    res.status(200).json({
      ok: true,
      uid: usuario._id,
      name: usuario.name,
      message: 'Usuario logeado exitosamente',
      token,
    });

  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ ok: false, message: 'Error logging in user' });
  }
};

const renovarToken = async(req, res = express.response) => {
    // Aquí iría la lógica de renovación de token
    const { uid, name } = req;

    // Generar un nuevo token JWT
    const token = await generarJWT(uid, name);
    if (!token) {
        return res.status(500).json({ ok: false, message: 'Error generating new token' });
    }
    // Enviar el nuevo token en la respuesta
    res.status(200).json({
        ok: true,
        uid,
        name,
        token,
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    renovarToken,
    // Aquí podrías agregar más funciones relacionadas con la autenticación
};