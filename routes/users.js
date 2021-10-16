// Express
var express = require("express");
var router = express.Router();
const get = require("../src/get.js");

// Return a JSON object with list of all documents within the collection.
router.get("/", async function (req, res, next) {
    let result = await get.all();

    const data = {
        data: result,
    };
    // terminal
    console.log(data);
    // browser json
    res.json(data);
    // status 200 (OK) returned
});

module.exports = router;




