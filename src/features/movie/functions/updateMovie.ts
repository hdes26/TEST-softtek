import AWS from 'aws-sdk'
import { IUpdateMovie } from '../core/interfaces/movie.interface';


export const handler = async (event: any) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;

    const { title, rating, description, done } = JSON.parse(event.body) as IUpdateMovie;

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



    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Movie updated successfully' })
    }

}

