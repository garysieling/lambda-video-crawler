// from https://stackoverflow.com/questions/32678325/how-to-import-bulk-data-from-csv-to-dynamodb
const fs = require('fs');
const parse = require('csv-parse');
const async = require('async');
const _ = require('lodash');


const csv_filename = "ytId.csv";

const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'});
const docClient = new AWS.DynamoDB.DocumentClient()

rs = fs.createReadStream(csv_filename);
parser = parse({
    columns : true,
    delimiter : ','
}, function(err, data) {

data.forEach((item) => {
	const row = {ytId: _.values(item)[0]}
        docClient.put({TableName: 'findlectures-videos', Item: row}, (err, res) => {
        if(err) console.log(err)
	})
})

});
rs.pipe(parser);
