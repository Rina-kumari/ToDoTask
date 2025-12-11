// Load environment variables
require('dotenv').config();

// create postgresql connection and pool
const { Pool } = require("pg");



const pool = new Pool({
    connectionString: process.env.DATABASE_URL,  // Reads from .env
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 10
});

pool.connect((err,connection)=>{
    if(err) throw err;
    console.log("connected to pgsql db successfully!");
    connection.release();
})

module.exports = pool;