/**
 * Get collections
 */
const database = require("../db/database.js");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require('bcryptjs'); // hash password
const jwt = require('jsonwebtoken');

 const auth = {
     register: async function run(email, password) {
         let db;

         const saltRounds = 9;
         const hashedPassword = await bcrypt.hash(password, saltRounds);

         try {
             // connect to db
             db = await database.getDb();
             // find correct user by document id and email within
             const filter = {
                 "_id": ObjectId("61631746cab3d5fde969ba7d"),
             };
             // create unique id and prepare temporary content
             const insertUser = {
                 $push: {
                     "Users": {
                         // $set, otherwise wont work in updateOne()
                         email: email,
                         password: hashedPassword,
                         docs: []
                     }
                 }
             }

             // replace old document with new content if match
             const result = await db.collection.updateOne(
                 filter,
                 insertUser);
             // output console log depending on match
             if (result.matchedCount == 0) {
                 console.log("No match, so no user added");
             } else {
                 console.log(
                     `${result.matchedCount} document(s) matched filter, updated ${result.modifiedCount} user(s)`
                 );
             }
         } finally {
             await db.client.close();
         }
     },
            
     validToken: async function run(req, res, next) {
         const token = process.env.JWT;
        // get server variable
         const secret = process.env.JWT_SECRET;

         jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                // send error response
            }
    
            // Valid token send on the request
            next();
        });
     },
     login: async function run(inputEmail, inputPassword) {
        let db;
         let result;
         let usersArray;
         var dbPassword;
         var loginSuccess; //true or false

        try {
            // connect to db
            db = await database.getDb();
            // get content
            result = await db.collection.find({}).toArray();

            usersArray = result[0].Users

            usersArray.forEach((user) => {
                // if email is found, compare passwords
                if (user.email === inputEmail) {
                    dbPassword = user.password;
                }
            })
             
           // compare inputPassword with hashed db password, returns true/false
            loginSuccess = await bcrypt.compare(inputPassword, dbPassword);
            // create token if login succeeded
            if (loginSuccess) {
                // create environment variable
                process.env.JWT_SECRET = `j%LX8agcf@mZC@8A2!xYXwxSr-*@tABz+U#xC7XdCc@RZ7Y6RXHxFztsYh*rR=8H`
                const payload = { email: inputEmail };
                const secret = process.env.JWT_SECRET;
                var token = '';
                // if loginSuccess is true, create token
                if (loginSuccess) {
                    token = jwt.sign(payload, secret, { expiresIn: '1' });
                    process.env.JWT = token
                    console.log("SUCCESS")
                } else {
                    token = false
                }
            }
        }
        finally {
            await db.client.close()
            return token
        }
    }
 }
 
module.exports = auth;