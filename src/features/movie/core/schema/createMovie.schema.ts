export const createMovie = {
    type: 'object',
    required: ['body',],
    properties: {
        body: {
            type: 'object',
            required: ['title', 'releaseYear', 'director', 'genre', 'durationMinutes', 'rating', 'description'],
            properties: {
                title: { type: 'string' },
                releaseYear: { type: 'number' },
                director: { type: 'string' },
                genre: { type: 'string' },
                durationMinutes: { type: 'number' },
                rating: { type: 'string' },
                description: { type: 'string' },
            },
        },
    }
}
