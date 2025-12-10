// create postgresql connection and pool

const {user,password,database} = require("pg/lib/defaults");

const pgsqlPool = require("pg").Pool;

const pool = new pgsqlPool({
    user:"postgres",
    password:"rina@123",
    database:"To_Do_List",
    host:"localhost",
    port:5432,
    max:10
});

pool.connect((err,connection)=>{
    if(err) throw err;
    console.log("connected to pgsql db successfully!");
    connection.release();
})

module.exports = pool;