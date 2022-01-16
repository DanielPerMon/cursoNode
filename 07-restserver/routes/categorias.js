const { Router} = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategoriaID, obtenerCategorias, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

//obtener todas las categorías - público
router.get('/',obtenerCategorias);

//obtener una categoría por id - público
router.get('/:id',[
    check('id','No es un id de Mongo').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],obtenerCategoriaID);

//crear categoría - privado - cualquier persona con un token válido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);

//Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId,
    check('id').custom(existeCategoria),
    validarCampos
],actualizarCategoria);

//Borrar una categoría - ADMIN_ROLE
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],borrarCategoria)

module.exports=router;