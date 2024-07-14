const mssql = require("mssql");
require("dotenv").config();

//Create the sql connection using thw secret crewdientials in dotenv file to make connection to the database:
const dbConfig = {
  host: process.env.SERVER_HOST,
  user: process.env.SERVER_DB_USERNAME,
  server: process.env.SERVER_DB_SERVER,
  database: process.env.SERVER_DB_DATABASE,
  password: process.env.SERVER_DB_PASSWORD,
  options: { 
    encrypt: false, //Use this if you're on Windows Azure
    enableArithAbort: true,
    trustedConnection: true, //Change to true for Windows authentication
    trustServerCertificate: true, //Change to true for local dev / self-signed certs
  },
  port: parseInt(process.env.SERVER_DB_PORT, 10), 
};

const dbConnect = new mssql.ConnectionPool(dbConfig);

dbConnect
  .connect()
  .then(() => {
    console.log("Connected to the database");
    // return pool;
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });

//Export the dbConnect:
module.exports = dbConnect;