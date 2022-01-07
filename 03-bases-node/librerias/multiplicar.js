const fs = require('fs');
const colors = require('colors');

const crearArchivo = async(base = 5, list = false, limite=10)=>{
    try{
        let salida = '';

        for(let i = 1; i<=limite; i++){
            salida+=(`${base} ${'x'.green} ${i} ${'='.green} ${base*i}\n`);
        }
        if(list){
            console.log('===================='.green);
            console.log('   Tabla del '.green,colors.blue(base));
            console.log('===================='.green);
            console.log(salida);
        }
        
        
        fs.writeFileSync(`tabla-${base}.txt`,salida);
    
        return `tabla-${base}.txt`;
    }catch(e){
        console.log(e);
    }
}

module.exports = {
    crearArchivo
}