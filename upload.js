const AWS = require('aws-sdk');
const fs = require('fs');

var s3 = new AWS.S3();
const filePath = './record1.mp3';
const bucketName = 'pavanminiproject';
const key = 'data.json';

const uploadFile = (filePath, bucketName, key) => {
  fs.readFile(filePath, (err, data) => {
    if (err) console.error(err);
    /*var base64data = new Buffer(data, 'binary');*/
    var params = {
      Bucket: bucketName,
      Key: key,
      ContentType: multipart
    };
    s3.upload(params, (err, data) => {
      if (err) console.error(`Upload Error ${err}`);
      console.log('Upload Completed');
    });
  });
};

uploadFile(filePath, bucketName, key);