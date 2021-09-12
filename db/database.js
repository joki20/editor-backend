const mongo = require("mongodb").MongoClient;
const config = require("./config.json");
const collectionName = "editor";
let uri = `mongodb+srv://${config.username}:${config.password}@${collectionName}.obxmw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// let uri = `mongodb://localhost:27017/${collectionName}`;

const database = {
    getDb: async function getDb() {
        let dsn = uri;

        if (process.env.NODE_ENV === "test") {
            dsn = "mongodb://localhost:27017/test";
        }

        const client = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            db: db,
            collection: collection,
            client: client,
        };
    },
};

module.exports = {
    collectionName,
    database,
    uri,
};
