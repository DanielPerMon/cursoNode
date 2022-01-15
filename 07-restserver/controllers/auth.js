const { response, json } = require("express");
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");
const { DefaultTransporter } = require("google-auth-library");


const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {
        //verificar si email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Credenciales incorrectas'
            });
        }

        //si el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Credenciales incorrectas'
            });
        }

        //verificar la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
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

const googleSignin = async (req, res = response) => {
    const { id_token } = req.body;

    /* try {

        const googleUser = await googleVerify(id_token);
        console.log(googleUser);
        res.json({
            msg:"Todo bien",
            id_token
        })
        
    } catch (err) {
        console.log(err);
    } */

    

    try {
        const { nombre, img, correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });
        //crear usuario
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                google: true,
                rol: DefaultTransporter
            };

            usuario = new Usuario(data);
            await usuario.save();
        }
        //verificar si está en BD
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }
        //generamos el token
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (err) {
        res.status(400).json({
            ok: false,
            msg: 'El Token no se pudo verificar'
        })
    }
}

module.exports = {
    login,
    googleSignin
}