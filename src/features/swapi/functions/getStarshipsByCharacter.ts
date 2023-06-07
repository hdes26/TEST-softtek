import axios, { AxiosResponse, AxiosError } from 'axios';
import { ISwapiResponse } from '../core/interfaces/starchip.interface';
import { IStarchipTranslationsMap, IStarshipInSpanish } from '../core/interfaces/starchip.interface';


export const handler = async (event: any) => {

    const { id } = event.pathParameters;

    const starchipTranslations: IStarchipTranslationsMap = {
        name: 'nombre',
        model: 'modelo',
        manufacturer: 'fabricante',
        cost_in_credits: 'costo_en_creditos',
        length: 'longitud',
        max_atmosphering_speed: 'velocidad_maxima_atmosferica',
        crew: 'tripulacion',
        passengers: 'pasajeros',
        cargo_capacity: 'capacidad_carga',
        consumables: 'consumibles',
        hyperdrive_rating: 'calificacion_hiperimpulsor',
        MGLT: 'MGLT',
        starship_class: 'clase_nave_espacial',
        pilots: 'pilotos',
        films: 'peliculas',
        created: 'creado',
        edited: 'editado',
        url: 'url',
    };


    function mapAttributes(obj: any, translations: IStarchipTranslationsMap): any {
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
            const swapiUrl = `https://swapi.dev/api/people/${id}`;
            const { starships } = await makeSwapiRequest<ISwapiResponse>(swapiUrl);

            const result = await Promise.all(starships.map(async (starchip: string) => {
                return await makeSwapiRequest<ISwapiResponse>(starchip);
            }));

            const datosTraducidos: IStarshipInSpanish[] = await Promise.all(result.map(async (starchip) => {
                return mapAttributes(starchip, starchipTranslations);
            }))

            return {
                statusCode: 200,
                body: JSON.stringify(datosTraducidos)
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    })();

}
