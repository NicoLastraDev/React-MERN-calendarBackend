const {response} = require('express')
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
  // Leer el token del header
  const token = req.header('x-token');

   //Validar si el token existe
  if (!token) {
    return res.status(401).json({ ok: false, message: 'No hay token en la petición' });
  }

  try {
      //Verificar el token
    const { uid, name } = jwt.verify(token, process.env.JWT_SECRET);

      //Agregar uid y name al request
    req.uid = uid;
    req.name = name;

    next();
  } catch (error) {
      console.error('Error validating JWT:', error);
      return res.status(401).json({ ok: false, message: 'Token no válido' });
  }
}

module.exports = {
  validarJWT,
};