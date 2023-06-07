import AWS from 'aws-sdk'
import { validate as validateUUID } from 'uuid';

export const handler = async (event: any) => {

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


    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Movie deleted" })
    }

};
