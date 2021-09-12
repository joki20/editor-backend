/**
 * Update a document in collection, by creating a new
 */
"use strict";

// MongoDB
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const database = require("../db/database.js"); // database.uri
const client = new MongoClient(database.uri);

// Function to update a document
async function updateDocument(body) {
    // body.id, body.title, body.content
    try {
        await client.connect();
        const db = client.db("mumin");
        const docs = db.collection("crowd");
        // find document by id
        const filter = { _id: ObjectId(body.id) };
        // // create new document if no match
        const options = { upsert: true };
        // create temporary content
        const updateDocument = {
            $set: {
                // otherwise wont wwork in updateOne()
                title: body.title,
                content: body.content,
            },
        };

        // replace old document with new content if match
        const result = await docs.updateOne(filter, updateDocument);
        if (result.matchedCount == 0) {
            console.log("No match, so no document updated");
        } else {
            console.log(
                `${result.matchedCount} document(s) matched filter, updated ${result.modifiedCount} document(s)`
            );
        }
    } finally {
        await client.close();
    }
}

module.exports = {
    updateDocument,
};
