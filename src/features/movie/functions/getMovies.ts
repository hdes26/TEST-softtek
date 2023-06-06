import AWS from 'aws-sdk'


export const handler = async () => {

    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        
        const result = await dynamodb.scan({
            TableName: 'MovieTable'
        }).promise()

        const movies = result.Items;


        return {
            statusCode: 200,
            body: JSON.stringify(movies)
        }

    } catch (error) {
        console.log(error);
    }


}

