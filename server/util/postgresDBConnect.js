const { Pool } = require('pg');

let pool;
if (process.env.NODE_ENV === 'production') {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
} else {
    pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'multiplayerbooksdev',
        password: 'oatmeal',
        port: 5432,
    })
}

function sendQuery(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

module.exports = sendQuery;