export interface SwapiResponse {
    [key: string]: any;
}

export interface SwapiTranslationMap {
    [key: string]: string;
}

export interface Character {
    nombre: string;
    altura: string;
    masa: string;
    color_de_cabello: string;
    color_de_piel: string;
    color_de_ojos: string;
    anio_de_nacimiento: string;
    genero: string;
    planeta_natal: string;
    peliculas: string[];
    especies: string[];
    vehiculos: string[];
    naves_estelares: string[];
    creado: string;
    editado: string;
    url: string;
}