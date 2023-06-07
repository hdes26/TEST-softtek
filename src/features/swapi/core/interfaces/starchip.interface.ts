export interface IStarshipInSpanish {
    nombre: string;
    modelo: string;
    fabricante: string;
    costo_en_creditos: string;
    longitud: string;
    velocidad_maxima_atmosferica: string;
    tripulacion: string;
    pasajeros: string;
    capacidad_carga: string;
    consumibles: string;
    calificacion_hiperimpulsor: string;
    MGLT: string;
    clase_nave_espacial: string;
    pilotos: string[];
    peliculas: string[];
    creado: string;
    editado: string;
    url: string;
}

export interface IStarship {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
    pilots: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
}

export interface ISwapiResponse {
    [key: string]: any;
}

export interface IStarchipTranslationsMap {
    [key: string]: string;
}