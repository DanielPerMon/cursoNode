const { Router} = require('express');
const { check } = require('express-validator');
const { cargarArchivo, mostrarImagen, actualizarCloudinary } = require('../controllers/uploads');
const { coleccionPermitidas } = require('../helpers');

const { validarCampos,validarArchivo } = require('../middlewares');

const router = Router();

router.post('/',validarArchivo,cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivo,
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarCloudinary);

router.get('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen)

module.exports = router;