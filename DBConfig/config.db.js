const mssql = require("mssql");
const dotenv = require("dotenv");
dotenv.config();

//Create the sql connection using thw secret crewdientials in dotenv file to make connection to the database:
const dbConnect = mssql.connect({
  host: process.env.SERVER_HOST,
  user: process.env.SERVER_DB_USERNAME,
  database: process.env.SERVER_DB_DATABASE,
  password: process.env.SERVER_DB_PASSWORD,
  port: process.env.SERVER_DB_PORT,
});

//Connection to sql database:
dbConnect.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to the database");
    }
});

//Export the dbConnect:
module.exports = dbConnect;