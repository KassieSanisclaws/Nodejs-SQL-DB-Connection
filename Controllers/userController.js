const brcypt = require('bcryptjs');
const { generateToken } = require('../utils');
const User = require('../Models/userModel');


const registerUser = async (req, res) => {
  const { username, password } = req.body;
    try {
      //Hash the password
       const hashedPassword = await brcypt.hash(password, 20);
       
     //Create new user
       const newUser = await User.createNewUser(username, hashedPassword);

      res.status(201).json(newUser);
    } catch(err) {
      res.status(500).send({ message: err.message });
    }
};


const loginUser = async (req, res) => {
  const { username, password } = req.body;
    try {
      //Find any user in db with the attempted username
       const user = await User.getUserByUsername(username);
       if(!user) {
         return res.status(400).send({ message: "Invalid username or password" });
       }

      //Compare the passwords: 
       const validatedPassword = await brcypt.compare(password, user.password);
         if(!validatedPassword){
            return res.status(401).send({ message: "Invalid username or password" });
         }

     //Generate Token: 
    const token = generateToken(user.id);

    res.status(200).json({ token });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = { 
    registerUser, 
    loginUser 
};