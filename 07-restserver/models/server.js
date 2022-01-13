const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //Base de datos
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Rutas de la aplicación
        this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        //cors
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen(){
        this.app.listen( this.port, () =>{
            console.log('Servidor corriendo en puerto',this.port)
        });
    }
}

module.exports = Server;