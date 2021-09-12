/**
 * List all documents in db.
 */
"use strict";

// MongoDB
const MongoClient = require("mongodb").MongoClient;
const database = require("../db/database.js"); // database.uri
const client = new MongoClient(database.uri);

// Function to get all documents
async function getDocuments() {
    let result;

    try {
        await client.connect();
        const database = client.db("mumin");
        const docs = database.collection("crowd");
        const cursor = docs.find();
        result = await cursor.toArray();
        console.log(result);

        // print a message if no documents were found
        if ((await cursor.count()) === 0) {
            console.log("No documents found!");
        }
    } finally {
        await client.close();
        return result;
    }
}

module.exports = {
    getDocuments,
};
