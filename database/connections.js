const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME
});

connection.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected');
});

module.exports = connection;