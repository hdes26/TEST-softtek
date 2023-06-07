import AWS from 'aws-sdk'
import { IUpdateMovie } from '../core/interfaces/movie.interface';

import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';
import httpErrorHandler from '@middy/http-error-handler';

import { validate as validateUUID } from 'uuid';
import { updateMovie } from '../core/schema';

const handler = middy(async (event: any, context: any) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
    const { id } = event.pathParameters;

    if (!validateUUID(id)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'The ID is not a valid UUID' }),
        };
    }

    const { title, rating, description, done } = event.body as IUpdateMovie;

    await dynamodb.update({
        TableName: 'MovieTable',
        Key: { id },
        UpdateExpression:
            'set done = :done, title = :title, rating = :rating, description = :description',
        ExpressionAttributeValues: {
            ':title': title,
            ':rating': rating,
            ':description': description,
            ':done': done
        },
        ReturnValues: 'ALL_NEW'
    }).promise()

    console.log(`Function: ${context.functionName}`);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Movie updated successfully' })
    }

});

handler
    .use(jsonBodyParser())
    .use(httpErrorHandler())
    .use(
        validator({
            eventSchema: transpileSchema(updateMovie)
        })
    )

export { handler };

