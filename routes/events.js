/**
 * Events Routes
 * /api/events
 */

const {Router} = require('express')
const {validarJWT} = require('../middlewares/validar-jwt')
const {getEvents, createEvent, updateEvent, deleteEvent} = require('../controllers/events');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar_campos');
const { isDate } = require('../helpers/isDate');

const router = Router();

// Middleware to validate JWT for all routes in this file
router.use(validarJWT);

router.get('/', getEvents);

router.post('/', [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    validarCampos,
    ],
  createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;