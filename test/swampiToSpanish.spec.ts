import { Character } from './../src/functions/swampiToSpanish/interfaces/swampiToSpanish.interface';
import { handler } from '../src/functions/swampiToSpanish/swampiToSpanish';
import { expect } from 'chai';

describe('swampiToSpanish function', () => {
  
  it('should return the correct message', async () => {
    const expectedCharacter: Character = {
      nombre: "Luke Skywalker",
      altura: "172",
      masa: "77",
      color_de_cabello: "blond",
      color_de_piel: "fair",
      color_de_ojos: "blue",
      anio_de_nacimiento: "19BBY",
      genero: "male",
      planeta_natal: "https://swapi.dev/api/planets/1/",
      peliculas: [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/6/"
      ],
      especies: [],
      vehiculos: [
        "https://swapi.dev/api/vehicles/14/",
        "https://swapi.dev/api/vehicles/30/"
      ],
      naves_estelares: [
        "https://swapi.dev/api/starships/12/",
        "https://swapi.dev/api/starships/22/"
      ],
      creado: "2014-12-09T13:50:51.644000Z",
      editado: "2014-12-20T21:17:56.891000Z",
      url: "https://swapi.dev/api/people/1/"
    };

    const response = await handler();

    expect(response!.statusCode).to.be.equal(200);
    expect(JSON.parse(response!.body)).to.deep.equal(expectedCharacter);
  });
});
