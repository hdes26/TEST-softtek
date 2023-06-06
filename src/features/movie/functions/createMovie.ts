import { v4 } from 'uuid'
import AWS from 'aws-sdk'
import { IAddMovie } from '../core/interfaces/movie.interface';

import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';
import httpErrorHandler from '@middy/http-error-handler';
import { createMovie } from '../core/schema';



const handler = middy(async (event: any, context: any) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

    const { title, releaseYear, director, genre, durationMinutes, rating, description } = event.body as IAddMovie;

    const id = v4();

    const newMovie = {
        id,
        title,
        releaseYear,
        director,
        genre,
        durationMinutes,
        rating,
        description,
        done: false
    }
    
    
    await dynamodb.put({
        TableName: 'MovieTable',
        Item: newMovie,
    }).promise()
    
    console.log(`Function ID: ${context.functionName}`);

    return {
        statusCode: 200,
        body: JSON.stringify(newMovie)
    }

});


handler
    .use(jsonBodyParser())
    .use(httpErrorHandler())
    .use(
        validator({
            eventSchema: transpileSchema(createMovie)
        })
    )

export { handler };