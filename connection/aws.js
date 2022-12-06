const aws = require("aws-sdk");
require('dotenv').config()

const s3 = new aws.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  sessionToken: process.env.SESSION_TOKEN
    ,
  region: process.env.REGION,
});

module.exports = s3;
