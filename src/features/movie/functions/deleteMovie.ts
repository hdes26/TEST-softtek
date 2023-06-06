import AWS from 'aws-sdk'


export const handler = async (event: any) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;

    await dynamodb.delete({
        TableName: 'MovieTable',
        Key: { id }
    }).promise()


    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Movie deleted" })
    }

}

