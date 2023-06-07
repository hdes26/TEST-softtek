import { IMovie } from '../core/interfaces/movie.interface';
import { expect } from 'chai';
import { createMovie, getMovie, getMovies, updateMovie, deleteMovie } from '../functions';

describe('movie functions', () => {

    it('create movie', async () => {

        const event = {
            body: JSON.stringify(
                {
                    title: "Movie Title",
                    releaseYear: 2022,
                    director: "Director Name",
                    genre: "Action",
                    durationMinutes: 120,
                    rating: 8.5,
                    description: "This is a description of the movie."

                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const result = await createMovie.handler(event, { functionName: 'create movie' });

        expect(result.statusCode).to.equal(200);
        expect(JSON.parse(result!.body)).to.contain({} as IMovie);


    });

    it('get movie', async () => {

        const event = {
            pathParameters: {
                id: 'd6ef2128-9bdd-4c65-817e-7f0b5cac0814'
            },
        };

        const result = await getMovie.handler(event, { functionName: 'get one movie' });



        expect(result.statusCode).to.equal(200);

    });

    it('get movies', async () => {

        const result = await getMovies.handler();

        expect(result.statusCode).to.equal(200);

    });

    it('update movie', async () => {

        const event = {
            body: JSON.stringify(
                {
                    title: "Movie Title",
                    rating: "PG-14",
                    description: "This is a description of the movie.",
                    done: true
                }
            ),
            pathParameters: {
                id: 'd6ef2128-9bdd-4c65-817e-7f0b5cac0814'
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const result = await updateMovie.handler(event, { functionName: 'update movie' });


        expect(result!.statusCode).to.equal(200);
        expect(JSON.parse(result!.body)).to.contain({ message: 'Movie updated successfully' });
    });

    it('delete movie', async () => {

        const event = {
            pathParameters: {
                id: 'd6ef2128-9bdd-4c65-817e-7f0b5cac0814'
            }
        }

        const result = await deleteMovie.handler(event, { functionName: 'delete movie' });


        expect(result.statusCode).to.equal(200);
        expect(JSON.parse(result!.body)).to.contain({ message: 'Movie deleted' });


    });

});
