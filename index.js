const AWS = require('aws-sdk'),
      fs = require('fs');

const S3 = require('aws-sdk/clients/s3');
const s3 = new AWS.S3();

const exec = require('child_process').exec;
const ffmpegDir = './exodus/bin/ffmpeg';

exports.handler = function(event, context, callback) {
  const ytId = event.ytId;
  const dataDir = event.dataDir || '/tmp';
  const url = 'https://www.youtube.com/watch?v=' + ytId;

  exec(`./bin/youtube-dl \
      --ffmpeg-location ${ffmpegDir} \
      --skip-download \
      --ignore-errors --youtube-skip-dash-manifest \
      -o '${dataDir}/data' --write-info-json \
      --no-call-home \
      ${url}
	`, function callback(error, stdout, stderr){
    if (error) {
      console.log(error);
    }

    console.log(stdout);
    console.log(stderr);

    const data = fs.readFileSync(dataDir + '/data.info.json');
    s3.putObject({
      Bucket: 'findlectures-ytdl',
      Key: 'v' + ytId + '.json',
      Body: new Buffer(data, 'binary')
    },function (resp) {
      console.log(arguments);
      console.log('Successfully uploaded package.');

      callback(null, "Success!");
    });
  });
}
