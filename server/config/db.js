const { Pool } = require("pg");
const isProduction = process.env.NODE_ENV === "production";
const database = process.env.DB_DATABASE;
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${database}`;

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
});

    // client: 'postgres',
    // connection: {
    //   host: process.env.DB_HOST,
    //   port:process.env.DB_PORT,
    //   database:process.env.DB_DATABASE,
    //   user:process.env.DB_USER,
    //   password:process.env.DB_PASSWORD,
    // }
  

module.exports = {
  pool,
  query: (text, params, callback) => pool.query(text, params, callback),
};
