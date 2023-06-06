import AWS from 'aws-sdk'


export const handler = async (event: any) => {
    
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;

    const result = await dynamodb.get({
        TableName: 'MovieTable',
        Key: {
            id
        }
    }).promise();


    const movie = result.Item;


    return {
        statusCode: 200,
        body: JSON.stringify(movie)
    }

}

