export interface ICharacterInSpanish {
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

export interface ICharacter {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}

export interface ISwapiResponse {
    [key: string]: any;
}

export interface ICharacterTranslationsMap {
    [key: string]: string;
}