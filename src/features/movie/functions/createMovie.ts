import { v4 } from 'uuid'
import AWS from 'aws-sdk'


export const handler = async (event: any) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

    const { title, releaseYear, director, genre, durationMinutes, rating, description } = JSON.parse(event.body);

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
    

    return {
        statusCode: 200,
        body: JSON.stringify(newMovie)
    }

}
