// Express
var express = require("express");
var router = express.Router();
const allow = require("../src/allow_user.js");

// Return a JSON object with list of all documents within the collection.
router.post("/", async function (req, res, next) {
    let email = req.body.email;
    let currentUser = req.body.currentUser;
    let docId = req.body.docId;
    let result = await allow.allow_user(email, currentUser, docId);

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

