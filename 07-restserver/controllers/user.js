const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async(req, res = response) => {

    const { limite = 5, desde=0} = req.query;
    const query = {estado:true};

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    });
}
const usuariosPost = async (req, res = response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //Guardar en BDD
    await usuario.save();

    res.json({
        usuario
    });
}
const usuariosPut = async(req, res = response) => {

    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario);
}
const usuariosDelete = async (req, res = response) => {

    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});

    res.json(usuario);
}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
}
module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPatch,
    usuariosPost,
    usuariosPut
}