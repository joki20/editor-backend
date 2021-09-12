/**
 * Post a document to collection
 */
"use strict";

// MongoDB
const MongoClient = require("mongodb").MongoClient;
const database = require("../db/database.js"); // database.uri
const client = new MongoClient(database.uri);

// Function to post a document
async function createDocument(title, content) {
    try {
        await client.connect();
        const database = client.db("editor");
        const docs = database.collection("docs");
        // create a document to insert
        const doc = {
            title: title,
            content: content,
        };
        const result = await docs.insertOne(doc);
        console.log(
            `A document was inserted with the _id: ${result.insertedId}`
        );
    } finally {
        await client.close();
    }
}

module.exports = {
    createDocument,
};
