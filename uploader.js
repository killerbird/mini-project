const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: 'AKIAQWZSVZEENWGBHEWI',
    secretAccessKey: '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'
});
console.log("uploading please wait!");
const fileu = 'record1.mp3';


const uploadFile = (filename) => {
  fs.readFile(filename, (err, data) => {
     if (err) throw err;
     const params = {
         Bucket: 'pavanminiproject', // pass your bucket name
         Key: 'TomCat.mp3', // file will be saved as testBucket/contacts.csv
         Body: data,
	'ACL': 'public-read'
     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err) throw s3Err
         console.log(`File uploaded successfully at ${data.Location}`)
     });
  });
};



const uploadedFile = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: "pavanminiproject",
        Key: 'Tomcat.mp3', // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};


uploadFile(fileu);
