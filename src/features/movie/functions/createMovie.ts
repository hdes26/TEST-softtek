import { v4 } from 'uuid'
import AWS from 'aws-sdk'
import { IAddMovie, IMovie } from '../core/interfaces/movie.interface';


export const handler = async (event: any) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

    const { title, releaseYear, director, genre, durationMinutes, rating, description } = JSON.parse(event.body) as IAddMovie;

    const id = v4();

    const newMovie: IMovie = {
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
    

    return {
        statusCode: 200,
        body: JSON.stringify(newMovie)
    }

}
