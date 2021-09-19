const mongo = require("mongodb").MongoClient;
const config = require("./config.json");
let myDb;
// when document is inserted, collection name is created automatically
let collectionName;

// if on travis, get login details from travis, otherwise get from config.json
let username = process.env.travisUsername || config.username;
let password = process.env.travisPassword || config.password;

const database = {
    getDb: async function getDb() {
        // connect to real database
        if (process.env.NODE_ENV !== "test") {
            dsn = `mongodb+srv://${username}:${password}@editor.obxmw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
            myDb = "editor";
            collectionName = "docs";
        }
        // connect to test database
        if (process.env.NODE_ENV === "test") {
            dsn = "mongodb://localhost:27017/test";
            myDb = 'test';
            collectionName = "docstest";
            // test: db.docstest.find() returns data in mongosh
        }
        var client = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db(myDb);
        const collection = db.collection(collectionName);
        return {
            db: db,
            collection: collection,
            client: client,
        };
    },
};

module.exports = database;
