const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

db = mysql.createPool({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT
})

global.db = db
module.exports = db








