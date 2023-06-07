import AWS from 'aws-sdk'

import middy from '@middy/core';
import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';
import httpErrorHandler from '@middy/http-error-handler';

import { validate as validateUUID } from 'uuid';
import { getMovie } from '../core/schema';

const handler = middy(async (event: any, context:any) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
    const { id } = event.pathParameters;

    if (!validateUUID(id)) {
        return  {
            statusCode: 400,
            body: JSON.stringify({ error: 'The ID is not a valid UUID' }),
        };
    }

    const result = await dynamodb.get({
        TableName: 'MovieTable',
        Key: {
            id
        }
    }).promise();

    if (!result) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: 'No data found' }),
        };
    }

    const movie = result.Item;

    console.log('Functions ' + context.functionName);
    
    return {
        statusCode: 200,
        body: JSON.stringify(movie)
    }

});


handler
    .use(httpErrorHandler())
    .use(
        validator({
            eventSchema: transpileSchema(getMovie)
        })
    )

export { handler };