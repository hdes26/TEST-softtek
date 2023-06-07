import axios, { AxiosResponse, AxiosError } from 'axios';
import { Character, SwapiResponse, SwapiTranslationMap } from '../core/interfaces/character.interface';


export const handler = async () => {


    const swapiTranslations: SwapiTranslationMap = {
        name: 'nombre',
        height: 'altura',
        mass: 'masa',
        hair_color: 'color_de_cabello',
        skin_color: 'color_de_piel',
        eye_color: 'color_de_ojos',
        birth_year: 'anio_de_nacimiento',
        gender: 'genero',
        homeworld: 'planeta_natal',
        films: 'peliculas',
        species: 'especies',
        vehicles: 'vehiculos',
        starships: 'naves_estelares',
        created: 'creado',
        edited: 'editado',
        url: 'url'
    };

    function mapAttributes(obj: any, translations: SwapiTranslationMap): any {
        const result: any = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const translation = translations[key] || key;
                result[translation] = obj[key];
            }
        }
        return result;
    }

    async function makeSwapiRequest<T>(url: string): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios.get(url);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                throw new Error(`Error en la solicitud a la API SWAPI: ${axiosError.response.status}`);
            } else if (axiosError.request) {
                throw new Error('No se pudo obtener una respuesta de la API SWAPI');
            } else {
                throw new Error('Error al realizar la solicitud a la API SWAPI');
            }
        }
    }


    return (async () => {
        try {
            const swapiUrl = 'https://swapi.dev/api/people/1';
            const datosSWAPI = await makeSwapiRequest<SwapiResponse>(swapiUrl);
            const datosTraducidos: Character = mapAttributes(datosSWAPI, swapiTranslations);

            return {
                statusCode: 200,
                body: JSON.stringify(datosTraducidos)
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    })();

}

