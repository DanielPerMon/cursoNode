require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async () => {
    let opt;
    const busquedas = new Busquedas();

    do {
        opt = await inquirerMenu();
        console.log(opt);
        switch (opt) {
            case '1':

                const termino = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(termino);
                const id = await listarLugares(lugares);
                const lugarSel = lugares.find(l => l.id === id);

                const clima = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng);

                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Mínima:',clima.min);
                console.log('Máxima:',clima.max);
                console.log('Como está el clima:',clima.desc);

                break;
            case '2':
                break;
        }

        if (opt !== 0) await pausa();

    } while (opt !== '0');
}

main();
