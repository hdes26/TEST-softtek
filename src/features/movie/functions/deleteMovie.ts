import AWS from 'aws-sdk'

import middy from '@middy/core';
import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';
import httpErrorHandler from '@middy/http-error-handler';

import { validate as validateUUID } from 'uuid';
import { deleteMovie } from '../core/schema/deleteMovie.schema';

const handler = middy(async (event: any, context: any) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
    const { id } = event.pathParameters;

    if (!validateUUID(id)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'The ID is not a valid UUID' }),
        };
    }

    await dynamodb.delete({
        TableName: 'MovieTable',
        Key: { id }
    }).promise()

    console.log(`Function: ${context.functionName}`);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Movie deleted" })
    }

});


handler
    .use(httpErrorHandler())
    .use(
        validator({
            eventSchema: transpileSchema(deleteMovie)
        })
    )

export { handler };