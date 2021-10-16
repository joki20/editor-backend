/**
 * Update a document in collection, by creating a new
 */
const ObjectId = require("mongodb").ObjectId;
const database = require("../db/database.js"); // database.uri

// Functions to update a document
const update = {
    // body.id, body.title, body.content
    updateDocument: async function run(docOwner, docId, content) {
        let db;

        try {
            // connect to db
            db = await database.getDb();
            // find document by id
            const findDoc = {
                "_id": ObjectId("61631746cab3d5fde969ba7d"),
            };
            // create temporary content
            const updateDocument = {
                $set: {
                    // $set, otherwise wont wwork in updateOne()
                    "Users.$[arr1].docs.$[arr2].content": content
                },
            };
            const specifyFilters = {
                arrayFilters: [
                    { "arr1.email": docOwner },
                    { "arr2.id": docId }
                ]
            }

            // replace old document with new content if match
            const result = await db.collection.updateOne(
                findDoc,
                updateDocument,
                specifyFilters
            );

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

module.exports = update;
