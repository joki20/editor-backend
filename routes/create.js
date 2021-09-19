// Express
var express = require("express");
var router = express.Router();

const post = require("../src/post.js");

// Return a JSON object with list of all documents within the collection.
router.post("/", async function (req, res, next) {
    // route parameters title and content used to create document
    await post.oneDocument(req.body);

    res.status(201).json({
        data: {
            msg: "Got a POST request, sending back 201 Created",
        },
    });
});

module.exports = router;