const dotenv = require('dotenv');
const express =require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const albumsRouter = require("./Routes/albumsRoute");
const userRouter = require('./Routes/userRoute');
 
//Create a new express application with the name of testDbConnection:
const testDbConnection = express();

//Call dotr env config to get access to our private environment veriables:
dotenv.config(); 

//Create CORS middleware:
testDbConnection.use(cors());

//Create body parser middleware:
testDbConnection.use(bodyParser.json());
testDbConnection.use(bodyParser.urlencoded({ extended: false }));

//Set the CORS headers:
testDbConnection.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//Create a Route to test the connection Below:
testDbConnection.use("/", albumsRouter);
testDbConnection.use("/users", userRouter);

//Server Error Handling: 
testDbConnection.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

//Server Port Listening at 54441 and or 3000:
const port = process.env.SERVER_PORT || 54441;
testDbConnection.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

//Export the testDbConnection:
module.exports = testDbConnection;