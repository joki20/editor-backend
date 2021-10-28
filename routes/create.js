// Express
var express = require("express");
var router = express.Router();
var auth = require("../src/auth.js");
var post = require("../src/post.js");

// Return a JSON object with list of all documents within the collection.
router.post("/",
    // if validToken not error, proceed next to post.oneDocument
    (req, res, next) => auth.validToken(req, res, next),
    // contains req.body.email, req.body.title, req.body.content, req.body.type
    (req, res) => post.oneDocument(req.body)
)

module.exports = router;