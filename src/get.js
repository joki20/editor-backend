/**
 * Get collections
 */
 const database = require("../db/database.js");

 const get = {
     all: async function run() {
         let db;
         let result;

         try {
             // connect to db
             db = await database.getDb();
             // get content
             result = await db.collection.find({}).toArray();
             console.log("INSIDE BACKEND src/get.js")
             console.log(result)
         }
         finally {
             await db.client.close()
             return result
         }
     },

     users: async function run() {
         let allData = await get.all();
         let usersArray = allData[0].Users
         console.log(usersArray);

         return usersArray;
     }
 }
 
module.exports = get;