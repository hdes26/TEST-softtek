import { Movie } from '../core/interfaces/movie.interface';
import { handler } from '../functions/createMovie';
import { expect } from 'chai';

describe('Create movie function', () => {

    it('should return a successful response', async () => {

        const movie = {
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

        const result = await handler(movie, { functionName: 'create' });

        expect(result.statusCode).to.equal(200);
        expect(JSON.parse(result!.body)).to.contain({} as Movie);


    });
});
