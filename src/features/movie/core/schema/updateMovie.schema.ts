export const updateMovie = {
    type: 'object',
    properties: {
        pathParameters: {
            type: 'object',
            properties: {
                id: { type: 'string' }
            },
            required: ['id'],

        },
        body: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                rating: { type: 'string' },
                description: { type: 'string' },
                done: { type: 'boolean' },
            },
        },
    },
    required: ['body', 'pathParameters'],

}
