// Express
var express = require("express");
var router = express.Router();
const app = express();
const get = require("../src/get.js");
const database = require("../db/database.js");

// Return a JSON object with list of all documents within the collection.
router.get("/", async function (req, res, next) {
    let result = await get.getDocuments();
    
    const data = {
        data: result,
    };
    // terminal
    console.log(data);
    // browser json
    res.json(data);
    // status
    res.status(200).send();
});

module.exports = router;
