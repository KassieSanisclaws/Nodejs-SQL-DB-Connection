const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, { expiresIn: '24hrs'});
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    } catch (err) {
        throw new Error("Invalid token");
    }
};

module.exports = {
   generateToken,
   verifyToken
}


