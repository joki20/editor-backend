/**
 * Post a document to collection
 */
const database = require("../db/database.js"); // database.uri

const create = {
    oneDocument: async function run(body) {
        let db;

        try {
            // connsct to db
            db = await database.getDb();
            // create a document for insertion
            const doc = {
                title: body.title,
                content: body.content,
            };
            // insert document and create collection db.collection
            const result = await db.collection.insertOne(doc);
            console.log(
                `A document was inserted with the _id: ${result.insertedId}`
            );
        } finally {
            await db.client.close();
        }
    }
}

module.exports = create;