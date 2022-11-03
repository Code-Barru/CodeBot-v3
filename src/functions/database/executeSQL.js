const mysql = require('mysql2/promise');

const sqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

module.exports = (client) => {
    client.executeSQL = async(request) => {
        const [res,fields] = await sqlPool.execute(request);
        // console.log(res)
        // console.log(fields)
        return res;
    }
}