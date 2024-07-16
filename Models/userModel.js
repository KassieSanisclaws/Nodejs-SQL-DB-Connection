const dbConnect = require("../DBConfig/config.db");

//Create a new user:
const User = function(user){
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.created_at = new Date();
}

//GetUsersList:
