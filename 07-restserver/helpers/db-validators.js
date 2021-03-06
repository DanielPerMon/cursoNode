const { Categoria,Role,Usuario, Producto } = require('../models');

const esRoleValido = async(rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la BDD`)
    }
}

const emailExiste = async(correo='') => {
    const email = await Usuario.findOne({correo});
    if(email){
        throw new Error(`El correo: ${correo} ya está registrado`)
    }
}

const existeID = async(id='') => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id no existe: ${id}`)
    }
}

const existeCategoria = async(id='') => {
    const categoria = await Categoria.findById(id);
    if(!categoria){
        throw new Error(`No existe la categoria con id: ${id}`)
    }
}

const existeProducto = async(id='') => {
    const producto = await Producto.findById(id);
    if(!producto){
        throw new Error(`No existe el producto con id: ${id}`)
    }
}

const coleccionPermitidas = (coleccion = '',colections=[]) =>{
    const incluida = colections.includes(coleccion);
    if(!incluida){
        throw new Error(`La colección ${coleccion} no es permitida, ${colections}`);
    }

    return true;
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeID,
    existeCategoria,
    existeProducto,
    coleccionPermitidas
}