/**
 * Allow user to edit document
 */
const database = require("../db/database.js");
const ObjectId = require("mongodb").ObjectId;
 
const allow = {
    allow_user: async function run(email, loggedInUser, docId) {
        let db;
 
        try {
            // connect to db
            db = await database.getDb();
            // find correct user by document id and email within
            const findDoc = {
                "_id": ObjectId("61631746cab3d5fde969ba7d"),
            };
            // push into array allowed_users with matching id
            const insertAllowedUser = {
                $push: {
                    "Users.$[arr1].docs.$[arr2].allowed_users": email
                }
            };
            const specifyFilters = {
                arrayFilters: [
                    { "arr1.email": loggedInUser },
                    { "arr2.id": docId }
                ]
            }
 
            // replace old document with new content if match
            const result = await db.collection.updateOne(
                findDoc,
                insertAllowedUser,
                specifyFilters
            );
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
    }
}

module.exports = allow;