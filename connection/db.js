require('dotenv').config()
const mysql = require('mysql2');


// create the connection to database
const connection = mysql.createConnection({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABSE_DB,
  port: process.env.PORT_DB,
});

module.exports = {connection};