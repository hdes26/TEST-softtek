export const deleteMovie = {
    type: 'object',
    properties: {
        pathParameters: {
            type: 'object',
            properties: {
                id: { type: 'string' }
            },
            required: ['id'],

        },
    },
    required: ['pathParameters'],

}
