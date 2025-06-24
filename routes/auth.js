const {Router} = require('express');
const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/auth');
const {validarJWT} = require('../middlewares/validar-jwt');

const router = Router();

const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');

router.get('/', (req, res) => {
    res.send('API de calendario backend');
});

router.post('/new',
  [
    // middlewares
    check('name', 'El nombre debe tener minimo 3 caracteres').isLength({ min: 3 }),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email está incorrecto').isEmail(),
    check('password', 'El password debe ser de al menos 6 caracteres')
      .isLength({ min: 6 }),
      validarCampos
  ],
  crearUsuario)

router.post('/login', 
  [
    // middlewares
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email está incorrecto').isEmail(),
    check('password', 'El password no debe ir vacío').not().isEmpty(),
  ],validarCampos,
  loginUsuario)

router.get('/renew', validarJWT, renovarToken)


module.exports = router;