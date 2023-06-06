import { v4 } from 'uuid'
import AWS from 'aws-sdk'
import { IAddMovie } from '../core/interfaces/addMovie.interface';

export const handler = async (event: any) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { title, releaseYear, director, genre, durationMinutes, rating, description } = JSON.parse(event.body) as IAddMovie;

    const createdAt = new Date();
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
        createdAt
    }

    await dynamodb.put({
        TableName: 'MovieTable',
        Item: newMovie
    }).promise()

    return {
        statusCode: 200,
        body: newMovie
    }
    
}

