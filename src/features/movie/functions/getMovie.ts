import AWS from 'aws-sdk'

import { validate as validateUUID } from 'uuid';

export const handler = async (event: any) => {

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
    
    return {
        statusCode: 200,
        body: JSON.stringify(movie)
    }

};
