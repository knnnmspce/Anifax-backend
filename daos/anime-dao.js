const AWS = require('aws-sdk');
const table = 'Titles'

/*AWS.config.update({
    region: 'us-east-1'
});*/
require('dotenv').config();
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const docClient = new AWS.DynamoDB.DocumentClient;

function retrieveAllTitles(){
    const params ={
        TableName: table
    };

    let titles;
    do{
        titles = docClient.scan(params).promise();
        params.ExclusiveStarterKey = titles.LastEvaluatedKey;
    } while(typeof titles.LastEvaluatedKey !== 'undefined')

    return titles;
}

module.exports = {
    retrieveAllTitles
};