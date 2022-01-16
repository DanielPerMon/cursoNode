const { Router} = require('express');
const { check } = require('express-validator');
const { obtenerProductos, obtenerProductoID, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeCategoria,existeProducto } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

router.get('/',obtenerProductos);

router.get('/:id',[
    check('id','No es un id de Mongo').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],obtenerProductoID);

router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
],crearProducto);

router.put('/:id',[
    validarJWT,
    //heck('categoria','No es un id de Mongo').isMongoId,
    check('id').custom(existeProducto),
    validarCampos
],actualizarProducto);

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],borrarProducto)

module.exports=router;