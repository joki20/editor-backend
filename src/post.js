/**
 * Post a document to collection
 */
/**
 * Update a document in collection, by creating a new
 */
 const ObjectId = require("mongodb").ObjectId;
 const database = require("../db/database.js"); // database.uri
 
 // Functions to update a document
 const create = {
     // body.id, body.title, body.content
     oneDocument: async function run(body) {
         let db;
         // create random string id (24 chars)
         let docId = new ObjectId().toHexString()
 
         try {
             // connect to db
             db = await database.getDb();
             // find correct user by document id and email within
             const filter = {
                 "_id": ObjectId("61631746cab3d5fde969ba7d"),
                 "Users.email": body.email
             };
             // create unique id and prepare temporary content
            const insertDocument = {
                $push: {
                    "Users.$.docs": {
                        // $set, otherwise wont work in updateOne()
                        id: docId,
                        title: body.title,
                        content: body.content,
                        allowed_users: [`${body.email}`]
                    }
                }
            }
             
            // replace old document with new content if match
             const result = await db.collection.updateOne(
                 filter,
                 insertDocument);
             // output console log depending on match
             if (result.matchedCount == 0) {
                 console.log("No match, so no document updated");
             } else {
                 console.log(
                     `${result.matchedCount} document(s) matched filter, updated ${result.modifiedCount} document(s)`
                 );
             }
         } finally {
             await db.client.close();
         }
     }
 }
 
 module.exports = create;
 