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
         }
         finally {
             await db.client.close()
             return result
         }
     }
 }
 
module.exports = get;