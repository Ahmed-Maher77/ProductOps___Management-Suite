const mysql = require("mysql2");

// Shared MySQL pool (promise-based)
const query = mysql
    .createPool({
        host: process.env.DATABASE_URL || "127.0.0.1",
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    })
    .promise();

module.exports = query;
