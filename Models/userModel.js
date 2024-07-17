const mssql = require("mssql");
const dbConnect = require("../DBConfig/config.db");

class User {
//Create New User:
  static async createNewUser(username, password) {
    try {
      const pool = await dbConnect;
      const result = pool
        .request()
        .input("username", mssql.VarChar, username)
        .input("password", mssql.VarChar, password)
        .query(`
          INSERT INTO users (username, password)
          OUTPUT INSERTED.*
          VALUES (@username, @password)
        `);
      return result;
    } catch (err) {
      throw new Error("Error creating user: " + err.message);
    }
  }

//Get user by username:
  static async getUserByUsername(username) {
    try {
      const pool = await dbConnect;
      const result = pool
        .request()
        .input("username", mssql.VarChar, username)
        .query("SELECT * FROM users WHERE username = @username");
      return (await result).recordset[0];
    } catch (err) {
      throw new Error("Error fetching user: " + err.message);
    }
  }
  
//Get user by ID:
  static async getUserByID(id) {
     try {
        const pool = await dbConnect;
        const result = pool
            .request()
            .input("id", mssql.Int, id)
            .query("SELECT * FROM users WHERE id = @id");
            return (await result).recordset[0];
     } catch (err) {
        throw new Error("Error fetching user: " + err.message);
     }
  }

//Update Password:
   static async updateUserPassword(userId, password) {
      try {
        const pool = await dbConnect;
        const result = pool
           .resquest()
           .input("id", mssql.Int, userId)
           .input("password", mssql.VarChar, password)
           .query("UPDATE users SET password = @password WHERE id = @userId");
           return result.recordset[0];
      } catch (err) {
        throw new Error("Error updating user: " + err.message);
      }
   }

 //Add more methods here as needed:


}

module.exports = User;
