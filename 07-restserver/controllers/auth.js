const { response } = require("express");
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");


const login = async (req, res = response) =>{

    const { correo, password} = req.body;

    try {
        //verificar si email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Credenciales incorrectas'
            });
        }

        //si el usuario está activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Credenciales incorrectas'
            });
        }

        //verificar la contraseña
        const validPassword = bcrypt.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Credenciales incorrectas'
            });
        }

        //generar el jwt
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Hable con el administrador"
        })
    }
}

module.exports = {
    login
}