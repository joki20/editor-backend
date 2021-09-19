/**
 * Update a document in collection, by creating a new
 */
const ObjectId = require("mongodb").ObjectId;
const database = require("../db/database.js"); // database.uri

// Functions to update a document
const update = {
    // body.id, body.title, body.content
    updateDocument: async function run(id, body) {
        let db;

        try {
            // connect to db
            db = await database.getDb();
            // find document by id
            const filter = { _id: ObjectId(id) };
            // create temporary content
            const updateDocument = {
                $set: {
                    // $set, otherwise wont wwork in updateOne()
                    title: body.title,
                    content: body.content,
                },
            };
            // replace old document with new content if match
            const result = await db.collection.updateOne(filter, updateDocument);
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
