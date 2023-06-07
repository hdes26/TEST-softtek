import axios, { AxiosResponse, AxiosError } from 'axios';
import { SwapiResponse } from '../core/interfaces/character.interface';


export const handler = async () => {



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
            const swapiUrl = 'https://swapi.dev/api/people/';
            const datosSWAPI = await makeSwapiRequest<SwapiResponse>(swapiUrl);
            return {
                statusCode: 200,
                body: JSON.stringify(datosSWAPI)
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    })();

}

