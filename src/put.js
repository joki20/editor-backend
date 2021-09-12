/**
 * Update a document in collection
 */
"use strict";

// MongoDB
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const database = require("../db/database.js"); // database.uri
const client = new MongoClient(database.uri);

// Function to update a document
async function updateDocument(title, content) {
    try {
        await client.connect();
        const database = client.db("editor");
        const docs = database.collection("docs");
        // find document by id
        const filter = { _id: ObjectId(body["_id"]) };
        // create new document if filter doesn't exist
        const options = { upsert: true };
        // create new content
        const updateDocument = {
            title: body.title,
            content: body.content,
        };
        // replace old document with new content
        const result = await db.collection.updateOne(filter, updateDocument);
        console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
        );
    } finally {
        await client.close();
    }
}

module.exports = {
    updateDocument,
};
