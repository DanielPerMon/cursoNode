const axios = require('axios');

class Busquedas {
    historial = ['Tegucicalpa', 'Madrid', 'San José'];

    constructor() {
        //leer db si existe
    }

    get paramsMapbox() {
        return {
            'language': 'es',
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5
        }
    }

    get weatherParams(){
        return{
            'appid': process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async ciudad(lugar = '') {

        try {

            const instancia = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await instancia.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

        } catch (error) {
            return [];
        }
    }

    async climaLugar(lat, lon) {
        try {
            const instancia = axios.create({
                baseURL:'https://api.openweathermap.org/data/2.5/weather',
                params: {...this.weatherParams,lat,lon}
            });

            const resp = await instancia.get();
            const { weather, main} = resp.data;

            return{
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {

        }
    }
}

module.exports = Busquedas